# Creates open slides
We use this image https://hub.docker.com/r/ppschweiz/openslides/

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

docker create --name openslides.vcp.sh \
    -e "VIRTUAL_HOST=$myresult" \
    -e "LETSENCRYPT_HOST=$myresult" \
    -e "LETSENCRYPT_EMAIL=$adminmail" \
    --link mysql:mysql \
    -v /var/data/openslides.vcp.sh/data:/data \
    --expose 8000 \
vcp-sh/openslides
#-e "VIRTUAL_PROTO=$VIRTUAL_PROTO" \
````
