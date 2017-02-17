# Creates lists.vcp.sh container
We use this image https://hub.docker.com/r/webdevops/php-nginx/

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg

subdomains[0]="lists"
subdomains[1]="list"
subdomains[2]="phplist"

createDomainNames $subdomains
pushd `dirname $0` > /dev/null
SCRIPTPATH=`pwd -P` #Get the Fullpath
popd > /dev/null

docker create --name lists.vcp.sh \
    -e "VIRTUAL_HOST=$myresult" \
    -e "LETSENCRYPT_HOST=$myresult" \
    -e "LETSENCRYPT_EMAIL=$adminmail" \
    -e "WEB_DOCUMENT_ROOT=/app/public" \
    --link mysql:mysql \
    --expose 80 \
    -v /var/data/phplist/www:/app \
    -v $SCRIPTPATH/nginxChildVhost.conf:/opt/docker/etc/nginx/vhost.common.d/10-location-root.conf \
    -e "HTTPS_METHOD=noredirect" \
webdevops/php-nginx:ubuntu-15.04
#-e "VIRTUAL_PROTO=$VIRTUAL_PROTO" \
````