# Creates piwik docker
We use this image https://hub.docker.com/_/piwik/

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
subdomains[0]="piwik"
subdomains[1]="analytics"
createDomainNames $subdomains

docker create --name piwik.vcp.sh \
    --link mysql:db \
    -e "VIRTUAL_HOST=$myresult" \
    -e "LETSENCRYPT_HOST=$myresult" \
    -e "LETSENCRYPT_EMAIL=$adminmail" \
    --expose 80 \
    piwik

````
