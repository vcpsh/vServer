# Update MySql Container
This script updates the mysql Container
ToDo: Dump all Data before stopping the Container
```` bash
#!/bin/bash
docker pull mysql:latest # ṕull newest image
docker stop mysql #stop container
docker rm mysql #remove container
./createMySQLContainer.sh #create the new container
````
