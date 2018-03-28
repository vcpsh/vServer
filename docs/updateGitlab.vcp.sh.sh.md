# Update averliekers.vcp.sh container
This script updates the Container

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
docker stop gitlab.vcp.sh #stop container
docker rm gitlab.vcp.sh #remove container
$(dirname $0)/gitlab.vcp.sh.sh #create the new container
docker start gitlab.vcp.sh

````
