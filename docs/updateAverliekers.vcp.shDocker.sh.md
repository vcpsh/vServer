# Update averliekers.vcp.sh container
This script updates the Container

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
docker pull webdevops/php-nginx:latest # pull newest image
docker stop averliekers.vcp.sh #stop container
docker rm averliekers.vcp.sh #remove container
$(dirname $0)/createAverliekers.vcp.sh.sh #create the new container
````
