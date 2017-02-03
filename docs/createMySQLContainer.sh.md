# Create MySQL server docker container
We use this (https://hub.docker.com/_/mysql/) Image
```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
docker create -v /var/data/mysql:/var/lib/mysql --name mysql -e MYSQL_ROOT_PASSWORD=$sql_root_password mysql:latest
````
