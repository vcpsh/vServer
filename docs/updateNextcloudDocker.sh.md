# Update nextcloud docker container
This script updates the nextcloud Container

```` bash
#!/bin/bash
source $(dirname $0)./config.cfg
docker pull wonderfall/nextcloud:$nextcloud_tag # ṕull newest image

docker stop nextcloud #stop container
docker rm nextcloud #remove container
$(dirname $0)./createNextcloudContainer.sh #create the new container
````
