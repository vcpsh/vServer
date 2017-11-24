# Icinga
Monitoring Software
https://hub.docker.com/r/jordan/icinga2/
Creates a config file for ssmtp in /var/data/icinga.vcp.sh/conf/ssmtp.conf

``` bash
#!/bin/bash
source $(dirname $0)/config.cfg

mkdir -p /var/data/icinga.vcp.sh/
mkdir -p /var/data/icinga.vcp.sh/sql
mkdir -p /var/data/icinga.vcp.sh/conf/icinga/
mkdir -p /var/data/icinga.vcp.sh/log
mkdir -p /var/data/icinga.vcp.sh/log/mysql
#mailserver definition
echo "
root=relay@vcp.sh
mailhub=mxf960.netcup.net:587
UseSTARTTLS=YES
AuthUser=relay@vcp.sh
AuthPass=$smarthost_password
FromLineOverride=NO
" > /var/data/icinga.vcp.sh/conf/ssmtp.conf

#remapping unix mails
echo "root:relay@vcp.sh:mxf960.netcup.net
nagios:relay@vcp.sh:mxf960.netcup.net
www-data:relay@vcp.sh:mxf960.netcup.net" > /var/data/icinga.vcp.sh/conf/revaliases


subdomains[0]="icinga"
subdomains[1]="monitoring"
createDomainNames $subdomains

docker create \
 --expose 80 \
 --expose 443 \
 --expose 5665 \
 --name icinga.vcp.sh \
 -e "VIRTUAL_HOST=$myresult" \
 -e "LETSENCRYPT_HOST=$myresult" \
 -e "LETSENCRYPT_EMAIL=$adminmail" \
 -e "HTTPS_METHOD=$HTTPS_METHOD" \
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
  -v /var/data/icinga.vcp.sh/conf/revaliases:/etc/ssmtp/revaliases:ro \
  -v /var/data/icinga.vcp.sh/log/:/var/log/ \
  -v /var/data/icinga.vcp.sh/icinga2:/etc/icinga2 \
  jordan/icinga2:latest

```
