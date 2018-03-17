# create reverse proxy
This Scripts create a nginx-proxy container and container for lets encrypt.
To forward an other docker file use:
>docker create \
>    --name example-app \
>    -e "VIRTUAL_HOST=example.com,www.example.com,mail.example.com" \
>    -e "LETSENCRYPT_HOST=example.com,www.example.com,mail.example.com" \
>    -e "LETSENCRYPT_EMAIL=foo@bar.com" \
>    -e "VIRTUAL_PROTO=https" \
>    -- expose 80
>webdevops/php-nginx

If you want to create test certificates that don't have the 5 certs/week/domain limits define the LETSENCRYPT_TEST environment variable with a value of true.

We use this for the proxy [https://github.com/jwilder/nginx-proxy](https://github.com/jwilder/nginx-proxy)

>Usage
>
>To run it:
>
>$ docker run -d -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro jwilder/nginx-proxy
>
>Then start any containers you want proxied with an env var > VIRTUAL_HOST=subdomain.youdomain.com
>
>$ docker run -e VIRTUAL_HOST=foo.bar.com  ...
>
>The containers being proxied must expose the port to be proxied, either by using the EXPOSE directive in their Dockerfile or by using the --expose flag to docker run or docker create.
>
>Provided your DNS is setup to forward foo.bar.com to the a host running nginx-proxy, the request will be routed to a container with the VIRTUAL_HOST env var set.'

This script builds a docker container of jwilder/nginx-proxy and forward ports 443 and 80.
To use automaticaly lets encrpt we need this docker https://github.com/JrCs/docker-letsencrypt-nginx-proxy-companion

test certificates

TODO: move the nginx config in the repo. With `client_max_body_size 512M;`

``` bash
#!/bin/bash
source $(dirname $0)/config.cfg
pushd `dirname $0` > /dev/null
SCRIPTPATH=`pwd -P` #Get the Fullpath
popd > /dev/null

mkdir -p /var/data/nginx/vhost.d

docker create -p 80:80 -p 443:443 \
    --name nginx-proxy \
    -e ENABLE_IPV6=true \
    -v /var/data/certs:/etc/nginx/certs:ro \
    -v /var/data/nginx/vhost.d:/etc/nginx/vhost.d:ro \
    -v /usr/share/nginx/html \
    -v $SCRIPTPATH/nginxproxy.conf:/etc/nginx/conf.d/nginxproxy.conf \
    -v /var/run/docker.sock:/tmp/docker.sock:ro \
    --label com.github.jrcs.letsencrypt_nginx_proxy_companion.nginx_proxy \
    --restart unless-stopped \
    jwilder/nginx-proxy

docker create --name letsencrypt \
        -v /var/data/certs:/etc/nginx/certs:rw \
        --volumes-from nginx-proxy \
        -v /var/run/docker.sock:/var/run/docker.sock:ro \
        -v /var/data/nginx/vhost.d:/etc/nginx/vhost.d:rw \
        -e DEBUG=$debug \
        jrcs/letsencrypt-nginx-proxy-companion
```
