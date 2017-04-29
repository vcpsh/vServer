# Creates alderaan.vcp.sh container
We use this image https://hub.docker.com/_/wordpress/

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg

subdomains[0]="alderaan-dev"

mkdir -p /var/data/alderaan/
createDomainNames $subdomains
pushd `dirname $0` > /dev/null
SCRIPTPATH=`pwd -P` #Get the Fullpath
popd > /dev/null

docker create --name alderaan.vcp.sh \
    -e "VIRTUAL_HOST=$myresult" \
    -e "LETSENCRYPT_HOST=$myresult" \
    -e "LETSENCRYPT_EMAIL=$adminmail" \
    -e "WORDPRESS_DB_HOST=mysql" \
    -e "WORDPRESS_DB_USER=alderaan.vcp.sh" \
    -e "WORDPRESS_DB_PASSWORD=$alderaanpwd" \
    -e "WORDPRESS_DB_NAME=alderaan.vcp.sh" \
    --link mysql:mysql \
    --expose 80 \
wordpress
#-e "VIRTUAL_PROTO=$VIRTUAL_PROTO" \
````
