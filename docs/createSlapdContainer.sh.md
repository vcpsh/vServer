# Create SLAPD docker container
We use this (https://hub.docker.com/_/mysql/) Image
``` bash
#!/bin/bash
source $(dirname $0)/config.cfg

mkdir -p /var/data/ldap/data

docker create -v /var/data/ldap/data/:/var/lib/ldap \
--name slapd \
-e "LDAP_DOMAIN=${domains[0]}" \
-e "LDAP_ORGANISATION=$org_name" \
-e "LDAP_ROOTPASS=$ldap_rootpass" \
-e "VIRTUAL_HOST=ldap.${domain[0]}" \
-e "LETSENCRYPT_HOST=ldap.${domains[0]}" \
-e "LETSENCRYPT_EMAIL=$adminmail" \
vcpsh/slapd:latest

```
