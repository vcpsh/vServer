# Create PhpMyAdmin Docker Container

https://hub.docker.com/r/phpmyadmin/phpmyadmin/
````bash
#!/bin/bash
source $(dirname $0)/config.cfg
docker create --name sqladmin --link mysql:db -e VIRTUAL_HOST=sqladmin.$domain --expose 80 -e LETSENCRYPT_TEST=$LETSENCRYPT_TEST -e LETSENCRYPT_HOST=sqladmin.$domain -e LETSENCRYPT_EMAIL=$adminmail  phpmyadmin/phpmyadmin


````
