# Creates pfila docker
We use this image https://hub.docker.com/r/webdevops/php-nginx/

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
mkdir -p /var/data/pfila.vcp.sh/www/public
subdomains[0]="pfila"
subdomains[1]="anmeldung"
subdomains[2]="pfingstlager"
createDomainNames $subdomains


docker create --name pfila.vcp.sh \
    -e "VIRTUAL_HOST=$myresult" \
    -e "LETSENCRYPT_HOST=$myresult" \
    -e "LETSENCRYPT_EMAIL=$adminmail" \
    -e "WEB_DOCUMENT_ROOT=/app/public" \
    -e "HTTPS_METHOD=noredirect" \
    --link mysql:mysql \
    --expose 80 \
    -v /var/data/pfila.vcp.sh/www:/app \
    -v /var/data/pfila.vcp.sh/php.ini:/opt/docker/etc/php/php.ini \
webdevops/php-nginx:ubuntu-14.04
#-e "VIRTUAL_PROTO=$VIRTUAL_PROTO" \

````
