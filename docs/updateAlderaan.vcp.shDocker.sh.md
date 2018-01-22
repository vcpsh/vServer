# Update alderaan.vcp.sh container
This script updates the Container

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
docker stop alderaan.vcp.sh #stop container
docker rm alderaan.vcp.sh #remove container
$(dirname $0)/createAlderaan.vcp.shDocker.sh #create the new container
````
