# Startskript

This scripts start all Services

```bash
#!/bin/bash
docker start mysql
docker start slapd

docker-compose -f docker-compose.ssoserver.yml -f docker-compose.ssoserver.override.yml start

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
docker start diefalken.vcp.sh
docker start website-redirects
docker start lists.vcp.sh
docker start gitlab.vcp.sh
docker start ldapadmin.vcp.sh
# archived
# docker start freepolis.vcp.sh
docker start averliekers.vcp.sh
docker start s.vcp.sh
docker start community.vcp.sh
docker start openslides.vcp.sh
docker start alderaan.vcp.sh
docker start collabora.vcp.sh
docker start collabora-nginx.vcp.sh
docker start graphite
docker start icinga.vcp.sh
```
