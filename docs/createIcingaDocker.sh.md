# Icinga
Monitoring Software
https://hub.docker.com/r/jordan/icinga2/

``` bash
source $(dirname $0)/config.cfg

mkdir -p /var/data/icinga.vcp.sh/
mkdir -p /var/data/icinga.vcp.sh/sql

subdomains[0]="icinga"
subdomains[1]="monitoring"
createDomainNames $subdomains

docker create \
 --expose 80 \
 --name icinga.vcp.sh \
 -e "VIRTUAL_HOST=$myresult" \
 -e "LETSENCRYPT_HOST=$myresult" \
 -e "LETSENCRYPT_EMAIL=$adminmail" \
 --link graphite:graphite \
  -e ICINGA2_FEATURE_GRAPHITE=true \
  -e ICINGA2_FEATURE_GRAPHITE_HOST=graphite \
  -e ICINGA2_FEATURE_GRAPHITE_PORT=2003 \
  -e "ICINGA_PASSWORD=$ICINGA_PASSWORD" \
  -e "ICINGAWEB2_PASSWORD=$ICINGAWEB2_PASSWORD" \
  -e "DIRECTOR_PASSWORD=$DIRECTOR_PASSWORD" \
  -e "IDO_PASSWORD=$IDO_PASSWORD" \
  -e "ICINGAWEB2_ADMIN_USER=admin" \
  -e "ICINGAWEB2_ADMIN_PASS=$ICINGAWEB2_ADMIN_PASS" \
  -v /var/data/icinga.vcp.sh/sql:/var/lib/mysql \
  jordan/icinga2:latest

```
