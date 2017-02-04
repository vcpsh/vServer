# Create SLAPD docker container
We use this (https://hub.docker.com/r/vcpsh/slapd/) Image

To edit the config bind to the ldap server with the user cn=config and the basedn cn=config

``` bash
#!/bin/bash
source $(dirname $0)/config.cfg

mkdir -p /var/data/ldap/data
mkdir -p /var/data/ldap/config

docker create --name slapd \
-v /var/data/ldap/data/:/var/lib/ldap \
-v /var/data/ldap/config:/etc/ldap \
-p 389:389 \
-e "VIRTUAL_HOST=ldap.${domain[0]}" \
-e "LETSENCRYPT_HOST=ldap.${domains[0]}" \
-e "LETSENCRYPT_EMAIL=$adminmail" \
vcpsh/slapd:latest
```
