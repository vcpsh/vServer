# Create SLAPD docker container

We use this (https://hub.docker.com/r/vcpsh/slapd/) Image

To edit the config bind to the ldap server with the user cn=config and the basedn cn=config.

To avoid weird permission issues the owner of /var/data/ldap needs to be the group 106

```bash
#!/bin/bash
source $(dirname $0)/config.cfg

mkdir -p /var/data/ldap/data
mkdir -p /var/data/ldap/backup
mkdir -p /var/data/ldap/config

# weird permission issue
chown -R 106 /var/data/ldap/
chmod -R 760 /var/data/ldap

docker create --name slapd \
-v /var/data/ldap/data/:/var/lib/ldap \
-v /var/data/ldap/config/:/etc/ldap \
-p 389:389 \
--network=dotnet \
--network=default \
vcpsh/slapd:latest
```
