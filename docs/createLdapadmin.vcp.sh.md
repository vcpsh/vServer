# Creates ldapadmin.vcp.sh container


```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
#mkdir -p /var/data/alderaan/www
subdomains[0]="ldapadmin"

createDomainNames $subdomains
pushd `dirname $0` > /dev/null
SCRIPTPATH=`pwd -P` #Get the Fullpath
popd > /dev/null

docker create --name ldapadmin.vcp.sh \
    -e "VIRTUAL_HOST=$myresult" \
    -e "LETSENCRYPT_HOST=$myresult" \
    -e "LETSENCRYPT_EMAIL=$adminmail" \
    -e "HTTPS_METHOD=$HTTPS_METHOD" \
    --network=slapd \
    --network=default \
    --env PHPLDAPADMIN_LDAP_HOSTS=slapd \
    --env PHPLDAPADMIN_HTTPS=false \
    --expose 80 \
osixia/phpldapadmin

docker network connect slapd ldapadmin.vcp.sh
#-e "VIRTUAL_PROTO=$VIRTUAL_PROTO" \
````
