# Icinga
Monitoring Software
https://hub.docker.com/r/jordan/icinga2/
Creates a config file for ssmtp in /var/data/icinga.vcp.sh/conf/ssmtp.conf

``` bash
#!/bin/bash
source $(dirname $0)/config.cfg

mkdir -p /var/data/icinga.vcp.sh/
mkdir -p /var/data/icinga.vcp.sh/sql
mkdir -p /var/data/icinga.vcp.sh/conf/
echo "
root=relay@vcp.sh
mailhub=mxf960.netcup.net:587
UseSTARTTLS=YES
AuthUser=relay@vcp.sh
AuthPass=$smarthost_password
FromLineOverride=NO
" > /var/data/icinga.vcp.sh/conf/ssmtp.conf



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
  -e "ICINGA2_FEATURE_GRAPHITE_URL=http://graphite" \
  -e "ICINGA_PASSWORD=$ICINGA_PASSWORD" \
  -e "ICINGAWEB2_PASSWORD=$ICINGAWEB2_PASSWORD" \
  -e "DIRECTOR_PASSWORD=$DIRECTOR_PASSWORD" \
  -e "IDO_PASSWORD=$IDO_PASSWORD" \
  -e "ICINGAWEB2_ADMIN_USER=admin" \
  -e "ICINGAWEB2_ADMIN_PASS=$ICINGAWEB2_ADMIN_PASS" \
  -v /var/data/icinga.vcp.sh/sql:/var/lib/mysql \
  -v /var/data/icinga.vcp.sh/conf/ssmtp.conf:/etc/ssmtp/ssmtp.conf:ro \
  jordan/icinga2:latest

```
