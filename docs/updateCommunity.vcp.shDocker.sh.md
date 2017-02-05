# Update vcp.sh docker container
This script updates the vcp.sh Container

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
docker pull webdevops/php-nginx:latest # pull newest image
docker stop community.vcp.sh #stop container
docker rm community.vcp.sh #remove container
$(dirname $0)/createCommunity.vcp.shDocker.sh #create the new container
````
