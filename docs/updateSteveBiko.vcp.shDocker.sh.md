# Update alderaan.vcp.sh container
This script updates the Container

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
docker stop stevebiko.vcp.sh #stop container
docker rm stevebiko.vcp.sh #remove container
$(dirname $0)/createSteveBiko.vcp.shDocker.sh #create the new container
````
