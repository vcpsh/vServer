# Create MySQL server docker container
We use this (https://hub.docker.com/_/mysql/) Image
``` bash
#!/bin/bash
source $(dirname $0)/config.cfg
mkdir -p /var/data/mysql
docker create --name mysql \
-p 3306:3306 \
-v /var/data/mysql:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=$sql_root_password \
mysql:latest
```
