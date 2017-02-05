# Creates gruppenverwaltung container
We use this image https://hub.docker.com/r/webdevops/php-nginx/

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg

subdomains[0]="gruppenverwaltung"
subdomains[1]="gv"

createDomainNames $subdomains

docker create --name gruppenverwaltung \
    -e "VIRTUAL_HOST=$myresult" \
    -e "LETSENCRYPT_HOST=$myresult" \
    -e "LETSENCRYPT_EMAIL=$adminmail" \
    -e "WEB_DOCUMENT_ROOT=/app/public" \
    --link slapd:slapd \
    --expose 80 \
    -v /var/data/gruppenverwaltung/www:/app \
    -v /var/data/gruppenverwaltung/php.ini:/opt/docker/etc/php/php.ini \
webdevops/php-nginx:ubuntu-16.04
#-e "VIRTUAL_PROTO=$VIRTUAL_PROTO" \

````
