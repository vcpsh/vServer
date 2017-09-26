# Creates alderaan.vcp.sh container
We use this image https://hub.docker.com/_/wordpress/

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
mkdir -p /var/data/alderaan/www
subdomains[0]="alderaan"

createDomainNames $subdomains
pushd `dirname $0` > /dev/null
SCRIPTPATH=`pwd -P` #Get the Fullpath
popd > /dev/null

docker create --name alderaan.vcp.sh \
    -e "VIRTUAL_HOST=$myresult" \
    -e "WEB_DOCUMENT_ROOT=/app/public" \
    -e "LETSENCRYPT_HOST=$myresult" \
    -e "LETSENCRYPT_EMAIL=$adminmail" \
    --link mysql:mysql \
    --expose 80 \
    -v /var/data/alderaan/www:/app \
    -v $SCRIPTPATH/nginxChildVhost.conf:/opt/docker/etc/nginx/vhost.common.d/10-location-root.conf \
webdevops/php-nginx:latest
#-e "VIRTUAL_PROTO=$VIRTUAL_PROTO" \
````
