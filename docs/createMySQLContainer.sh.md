# Create MySQL server docker container

```` bash
#!/bin/bash
docker create -v /var/data/mysql:/var/lib/mysql--name mysql -e MYSQL_RANDOM_ROOT_PASSWORD=yes -d mysql:latest
````
