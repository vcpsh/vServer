# Update lists.vcp.sh container
This script updates the Container

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
docker pull webdevops/php-nginx:latest # pull newest image
docker stop lists.vcp.sh #stop container
docker rm lists.vcp.sh #remove container
$(dirname $0)/createLists.vcp.sh.sh #create the new container
````
