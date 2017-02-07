# Update die Falken docker container
This script updates the Container

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
docker pull webdevops/php-nginx:latest # pull newest image
docker stop diefalken.vcp.sh #stop container
docker rm diefalken.vcp.sh #remove container
$(dirname $0)/createDiefalken.vc.shDocker.sh #create the new container
````
