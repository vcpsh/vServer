# Update nextcloud docker container
This script updates the nextcloud Container

```` bash
#!/bin/bash
source ./config.cfg
docker pull wonderfall/nextcloud:$nextcloud_tag # ṕull newest image

docker stop nextcloud #stop container
docker rm nextcloud #remove container
./createNextcloudContainer.sh #create the new container
````
