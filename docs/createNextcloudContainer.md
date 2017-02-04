# Creates nextcloud container
We use this image https://hub.docker.com/r/webdevops/php-nginx/

``` bash
#!/bin/bash
source $(dirname $0)/config.cfg
mkdir -p /var/data/cloud.vcp.sh/www/public
subdomains[0]="cloud"
subdomains[1]="nextcloud"
subdomains[2]="owncloud"
subdomains[2]="pfadicloud"
createDomainNames $subdomains


docker create --name cloud.vcp.sh \
    -e "VIRTUAL_HOST=$myresult" \
    -e "LETSENCRYPT_HOST=$myresult" \
    -e "LETSENCRYPT_EMAIL=$adminmail" \
    -e "WEB_DOCUMENT_ROOT=/app/public" \
    --link mysql:mysql \
    --expose 80 \
    -v /var/data/cloud_vcp_sh/www:/app \
    -v /var/data/cloud_vcp_sh/php.ini:/opt/docker/etc/php/php.ini \
webdevops/php-nginx:ubuntu-14.04
#-e "VIRTUAL_PROTO=$VIRTUAL_PROTO" \

```
