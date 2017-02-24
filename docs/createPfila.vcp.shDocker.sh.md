# Creates pfila docker
We use this image https://hub.docker.com/r/webdevops/php-nginx/

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
mkdir -p /var/data/pfila.vcp.sh/www/public
subdomains[0]="pfila"
subdomains[1]="anmeldung"
subdomains[2]="pfingstlager"
subdomains[3]="landeslager"
createDomainNames $subdomains

pushd `dirname $0` > /dev/null
SCRIPTPATH=`pwd -P` #Get the Fullpath
popd > /dev/null

docker create --name pfila.vcp.sh \
    -e "VIRTUAL_HOST=$myresult" \
    -e "WEB_DOCUMENT_ROOT=/app/public" \
    -e "LETSENCRYPT_HOST=$myresult" \
    -e "LETSENCRYPT_EMAIL=$adminmail" \
    -e "HTTPS_METHOD=noredirect" \
    --link mysql:mysql \
    --expose 80 \
    -v /var/data/pfila.vcp.sh/www:/app \
    -v /var/data/pfila.vcp.sh/php.ini:/opt/docker/etc/php/php.ini \
    -v $SCRIPTPATH/nginxChildVhost.conf:/opt/docker/etc/nginx/vhost.common.d/10-location-root.conf \
webdevops/php-nginx:ubuntu-14.04
#-e "VIRTUAL_PROTO=$VIRTUAL_PROTO" \

````
