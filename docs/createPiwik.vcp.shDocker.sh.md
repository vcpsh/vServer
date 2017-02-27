# Creates piwik docker
We use this image https://hub.docker.com/_/piwik/

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
subdomains[0]="piwik"
subdomains[1]="analytics"
createDomainNames $subdomains

docker create \
 --expose 80 \
 --link mysql:mysql \
 --name piwik.vcp.sh \
 -e "VIRTUAL_HOST=$myresult" \
 -e "LETSENCRYPT_HOST=$myresult" \
 -e "LETSENCRYPT_EMAIL=$adminmail" \
 -e "PIWIK_MYSQL_USER=piwik" \
 -e "PIWIK_MYSQL_PASSWORD=$PIWIK_MYSQL_PASSWORD" \
 marvambass/piwik


````
old code

docker create --name piwik.vcp.sh \
    --link mysql:db \
    -e "VIRTUAL_HOST=$myresult" \
    --expose 9000 \
    -e "LETSENCRYPT_HOST=$myresult" \
    -e "LETSENCRYPT_EMAIL=$adminmail" \
    piwik
