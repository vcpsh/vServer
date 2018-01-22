# Creates alderaan.vcp.sh container

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
mkdir -p /var/data/stevebiko/www
subdomains[0]="steve-biko-dev"
subdomains[1]="stevebiko-dev"
createDomainNames $subdomains
pushd `dirname $0` > /dev/null
SCRIPTPATH=`pwd -P` #Get the Fullpath
popd > /dev/null

docker create --name stevebiko.vcp.sh \
    -e "VIRTUAL_HOST=$myresult" \
    -e "WEB_DOCUMENT_ROOT=/app" \
    -e "LETSENCRYPT_HOST=$myresult" \
    -e "LETSENCRYPT_EMAIL=$adminmail" \
    -e "HTTPS_METHOD=$HTTPS_METHOD" \
    --link mysql:mysql \
    --expose 80 \
    -v /var/data/alderaan/www:/app \
    -v $SCRIPTPATH/nginxChildVhost.conf:/opt/docker/etc/nginx/vhost.common.d/10-location-root.conf \
webdevops/php-nginx:latest
#-e "VIRTUAL_PROTO=$VIRTUAL_PROTO" \
````
