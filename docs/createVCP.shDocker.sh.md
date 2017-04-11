# Creates vcp-sh.de.de docker container

We use this image https://hub.docker.com/r/webdevops/php-nginx/
LDAP Extension is enabled. This is important for the login with the ldap Server
```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
pushd `dirname $0` > /dev/null
SCRIPTPATH=`pwd -P` #Get the Fullpath
popd > /dev/null

mkdir -p /var/data/vcp.sh/www/public

docker create --name vcp.sh \
    -e "VIRTUAL_HOST=${domains[0]} , ${domains[1]}" \
    -e "LETSENCRYPT_HOST=${domains[0]} , ${domains[1]}" \
    -e "LETSENCRYPT_EMAIL=$adminmail" \
    -e "WEB_DOCUMENT_ROOT=/app/public" \
    --link mysql:mysql \
    --link slapd:ldap \
    --link nextcloud:nextcloud \
    --link smarthost:smarthost \
    --expose 80 \
    -v /var/data/vcp.sh/www:/app \
    -v $SCRIPTPATH/nginxChildVhost.conf:/opt/docker/etc/nginx/vhost.common.d/10-location-root.conf \
webdevops/php-nginx:ubuntu-14.04
#- \

````
