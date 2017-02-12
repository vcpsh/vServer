# Update freepolis container
This script updates the Container

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
docker pull webdevops/php-nginx:latest # pull newest image
docker stop freepolis.vcp.sh #stop container
docker rm freepolis.vcp.sh #remove container
$(dirname $0)/createFreepolisContainer.sh #create the new container
````
