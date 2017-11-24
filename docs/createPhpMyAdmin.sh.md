# Create PhpMyAdmin Docker Container

https://hub.docker.com/r/phpmyadmin/phpmyadmin/
````bash
#!/bin/bash
source $(dirname $0)/config.cfg
docker create --name sqladmin\
 --link mysql:db\
  -e "VIRTUAL_HOST=sqladmin.${domains[0]}"\
  -e LETSENCRYPT_HOST="sqladmin.${domains[0]}"\
  -e "HTTPS_METHOD=$HTTPS_METHOD" \
  --expose 80 \
  -e LETSENCRYPT_EMAIL=$adminmail phpmyadmin/phpmyadmin


````
