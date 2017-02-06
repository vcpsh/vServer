# Startskript
This scripts start all Services

- nginx-proxy
- letsencrypt container


``` bash
#!/bin/bash
docker start smarthost
docker start mail-forwarder

docker start nginx-proxy
docker start letsencrypt
docker start mysql
docker start sqladmin
docker start nextcloud
docker start slapd
docker start vcp.sh
docker start pfila.vcp.sh
docker start piwik.vcp.sh
docker start gruppenverwaltung
docker start community.vcp.sh
```
