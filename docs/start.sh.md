# Startskript
This scripts start all Services

``` bash
#!/bin/bash
docker start mysql
docker start slapd

docker start smarthost
docker start mail-forwarder

docker start nginx-proxy
docker start letsencrypt
docker start sqladmin
docker start nextcloud-redis
docker start nextcloud
docker start vcp.sh
docker start pfila.vcp.sh
docker start piwik.vcp.sh
docker start gruppenverwaltung
docker start community.vcp.sh
docker start diefalken.vcp.sh
docker start website-redirects
docker start lists.vcp.sh
docker start freepolis.vcp.sh
docker start averliekers.vcp.sh
docker start s.vcp.sh

docker start graphite
docker start icinga.vcp.sh
```
