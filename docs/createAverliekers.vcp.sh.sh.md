# Creates averliekers.vcp.sh container
We use this image https://hub.docker.com/r/webdevops/php-nginx/

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg

subdomains[0]="averliekers"
subdomains[1]="al"
subdomains[2]="elmshorn"

createDomainNames $subdomains
pushd `dirname $0` > /dev/null
SCRIPTPATH=`pwd -P` #Get the Fullpath
popd > /dev/null

docker create --name averliekers.vcp.sh \
    -e "VIRTUAL_HOST=$myresult" \
    -e "WEB_DOCUMENT_ROOT=/app/public" \
    -e "LETSENCRYPT_HOST=$myresult" \
    -e "LETSENCRYPT_EMAIL=$adminmail" \
    -e "HTTPS_METHOD=$HTTPS_METHOD" \
    --link mysql:mysql \
    --expose 80 \
    -v /var/data/averliekers/www:/app \
    -v $SCRIPTPATH/nginxChildVhost.conf:/opt/docker/etc/nginx/vhost.common.d/10-location-root.conf \
webdevops/php-nginx:latest
#-e "VIRTUAL_PROTO=$VIRTUAL_PROTO" \
````
