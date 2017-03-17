# Update url shortener container
This script updates the Container

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
docker pull webdevops/php-nginx:latest # pull newest image
docker stop s.vcp.sh #stop container
docker rm s.vcp.sh #remove container
$(dirname $0)/createUrlShortener.sh #create the new container
````
