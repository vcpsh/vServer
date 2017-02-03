# Update MySql Container
This script updates the mysql Container
Dumps all Data in the backup File. Overwrites the old one.
```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
docker pull mysql:latest # ṕull newest image
docker exec mysql sh -c 'exec mysqldump --all-databases -uroot -p "$sql_root_password"' > /var/data/mysql/backup/all-databases.sql
docker stop mysql #stop container
docker rm mysql #remove container
$(dirname $0)/createMySQLContainer.sh #create the new container
````
