# Create Nextcloud Container

For the nextcloud docker container we use this image https://hub.docker.com/r/wonderfall/nextcloud/.


```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
#Create folder when they not exists
mkdir -p /var/data/nextcloud/data
mkdir -p /var/data/nextcloud/config
mkdir -p /var/data/nextcloud/apps

subdomains[0]="cloud"
subdomains[1]="owncloud"
subdomains[2]="nextcloud"
subdomains[3]="pfadicloud"
subdomains[4]="c"
createDomainNames $subdomains

docker create --name nextcloud \
       --link mysql:db_nextcloud \
       --link slapd:slapd \
       -link nextcloud-redis:redis \
       -v /var/data/nextcloud/data:/data \
       -v /var/data/nextcloud/config:/config \
       -v /var/data/nextcloud/apps:/apps2 \
       -e UID=$nextcloud_uid -e GID=$nextcloud_gid \
       -e UPLOAD_MAX_SIZE=10G \
       -e APC_SHM_SIZE=128M \
       -e OPCACHE_MEM_SIZE=128 \
       -e REDIS_MAX_MEMORY=64mb \
       -e CRON_PERIOD=15m \
       -e TZ=Etc/UTC \
       -e ADMIN_USER=admin \
       -e ADMIN_PASSWORD=$nextcloud_password \
       -e DB_TYPE=mysql \
       -e DB_NAME=$nextcloud_db_name \
       -e DB_USER=$nextcloud_db_user \
       -e DB_PASSWORD=$nextcloud_db_password \
       -e DB_HOST=db_nextcloud \
       -e "VIRTUAL_HOST=$myresult" \
       -e "LETSENCRYPT_HOST=$myresult" \
       -e "LETSENCRYPT_EMAIL=$adminmail" \
       --expose 8888 \
       -e "HTTPS_METHOD=noredirect" \
       wonderfall/nextcloud:$nextcloud_tag

````
-e LETSENCRYPT_TEST=$LETSENCRYPT_TEST \
