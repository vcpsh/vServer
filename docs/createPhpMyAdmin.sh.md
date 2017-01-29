# Create PhpMyAdmin Docker Container

https://hub.docker.com/r/phpmyadmin/phpmyadmin/
````bash
#!/bin/bash
source ./config.cfg
docker create --name sqladmin --link mysql:db -e VIRTUAL_HOST=sqladmin.$domain --expose 80 phpmyadmin/phpmyadmin


````
