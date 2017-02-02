# Create Nextcloud Container

For the nextcloud docker container we use this image https://hub.docker.com/r/wonderfall/nextcloud/.


```` bash
#!/bin/bash
source ./config.cfg
#Create folder when they not exists
mkdir -p /var/data/nextcloud/data
mkdir -p /var/data/nextcloud/config
mkdir -p /var/data/nextcloud/apps

docker create --name nextcloud \
       --link mysql:db_nextcloud \
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
       -e VIRTUAL_HOST=cloud.$domain \
       --expose 8080 \
       -e LETSENCRYPT_TEST=$LETSENCRYPT_TEST \
       -e LETSENCRYPT_HOST=cloud.$domain \
       -e LETSENCRYPT_EMAIL=$adminmail \
       wonderfall/nextcloud:$nextcloud_tag

````