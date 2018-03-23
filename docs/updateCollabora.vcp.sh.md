# Update averliekers.vcp.sh container
This script updates the Container

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
docker stop collabora.vcp.sh #stop container
docker rm collabora.vcp.sh #remove container
docker stop collabora-nginx.vcp.sh #stop container
docker rm collabora-nginx.vcp.sh #remove container
$(dirname $0)/createCollabora.vcp.sh.sh #create the new container
docker start collabora.vcp.sh
docker start collabora-nginx.vcp.sh

````
