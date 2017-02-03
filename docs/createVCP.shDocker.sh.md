# Creates vcp-sh.de.de docker container

We use this image https://hub.docker.com/r/webdevops/php-nginx/
LDAP Extension is enabled. This is important for the login with the ldap Server
```` bash
#!/bin/bash
source $(dirname $0)./config.cfg

docker create --name vcp.sh \
    -e "VIRTUAL_HOST=" \
    -e "LETSENCRYPT_HOST=" \
    -e "LETSENCRYPT_EMAIL=$adminmail" \
    -e "VIRTUAL_PROTO=$VIRTUAL_PROTO" \
    --expose 80
    -v
webdevops/php-nginx

````
