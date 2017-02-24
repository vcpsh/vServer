# Update vcp.sh docker container
This script updates the vcp.sh Container

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
docker pull webdevops/php-nginx:ubuntu-14.04 # pull newest image
docker stop gruppenverwaltung #stop container
docker rm gruppenverwaltung #remove container
$(dirname $0)/createGruppenverwaltungContainer.sh #create the new container
````
