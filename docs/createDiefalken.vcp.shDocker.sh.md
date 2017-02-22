# Creates Community container
We use this image https://hub.docker.com/r/webdevops/php-nginx/

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg

subdomains[0]="diefalken"
subdomains[1]="falken"
subdomains[2]="leck"

createDomainNames $subdomains
pushd `dirname $0` > /dev/null
SCRIPTPATH=`pwd -P` #Get the Fullpath
popd > /dev/null

docker create --name diefalken.vcp.sh \
    -e "VIRTUAL_HOST=$myresult" \
    -e "LETSENCRYPT_HOST=$myresult" \
    -e "LETSENCRYPT_EMAIL=$adminmail" \
    -e "WEB_DOCUMENT_ROOT=/app/public" \
    --link mysql:mysql \
    --link smarthost:smarthost \
    --expose 80 \
    -v /var/data/diefalken/www:/app \
    -v $SCRIPTPATH/nginxChildVhost.conf:/opt/docker/etc/nginx/vhost.common.d/10-location-root.conf \
    -e "HTTPS_METHOD=noredirect" \
webdevops/php-nginx:latest
#-e "VIRTUAL_PROTO=$VIRTUAL_PROTO" \
````
