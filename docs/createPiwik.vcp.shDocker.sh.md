# Creates piwik docker

We use this image https://hub.docker.com/_/piwik/

```bash
#!/bin/bash
source $(dirname $0)/config.cfg
subdomains[0]="piwik"
subdomains[1]="analytics"
subdomains[2]="matomo"
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
 -e "PIWIK_NOT_BEHIND_PROXY=true" \
 -e "HTTPS_METHOD=$HTTPS_METHOD" \
 marvambass/piwik:3.3.0
```

old code

docker create --name piwik.vcp.sh \
 --link mysql:db \
 -e "VIRTUAL_HOST=$myresult" \
 --expose 9000 \
 -e "LETSENCRYPT_HOST=$myresult" \
 -e "LETSENCRYPT_EMAIL=$adminmail" \
 piwik
