# Creates open slides
```` bash
#!/bin/bash
source $(dirname $0)/config.cfg

subdomains[0]="openslides"

createDomainNames $subdomains
pushd `dirname $0` > /dev/null
SCRIPTPATH=`pwd -P` #Get the Fullpath
popd > /dev/null

mkdir -p /var/data/openslides.vcp.sh/data/
mkdir -p /var/data/openslides.vcp.sh/config/
mkdir -p /var/data/openslides.vcp.sh/supervisord/

docker create --name openslides.vcp.sh \
    -e "VIRTUAL_HOST=$myresult" \
    -e "LETSENCRYPT_HOST=$myresult" \
    -e "LETSENCRYPT_EMAIL=$adminmail" \
    -e "HTTPS_METHOD=$HTTPS_METHOD" \
    --link mysql:mysql \
    -v /var/data/openslides.vcp.sh/data:/data \
    --expose 8000 \
vcp-sh/openslides

docker cp /var/data/openslides.vcp.sh/logo-projector.png openslides.vcp.sh:/app/openslides/static/img/logo-projector.png
#-e "VIRTUAL_PROTO=$VIRTUAL_PROTO" \
````
docker cp /var/data/nginx/config/proxy.conf nginx-proxy:/etc/nginx/proxy.conf
