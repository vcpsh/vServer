# Create SLAPD docker container
We use this (https://hub.docker.com/_/mysql/) Image
``` bash
#!/bin/bash
source ../config.cfg
docker create -v /var/lib/ldap:/var/lib/ldap \
--name slapd \
-e "LDAP_DOMAIN"=$domain \
-e "LDAP_ORGANISATION"=$org_name \
-e "LDAP_ROOTPASS"=$ldap_rootpass \
-e "VIRTUAL_HOST"=ldap.$domain \
-e "LETSENCRYPT_HOST"=ldap.$domain \
-e "LETSENCRYPT_EMAIL"=$adminmail \
--expose 389 \
vcpsh/slapd:latest
```
