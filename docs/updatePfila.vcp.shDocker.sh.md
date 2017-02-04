# Update pfila.vcp.sh docker container
This script updates the vcp.sh Container

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
docker pull webdevops/php-nginx:ubuntu-14.04 # pull newest image
docker stop pfila.vcp.sh #stop container
docker rm pfila.vcp.sh #remove container
$(dirname $0)/createPfila.vcp.shDocker.sh #create the new container
````
