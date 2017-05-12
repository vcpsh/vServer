# Update docker container


```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
docker pull ppschweiz/openslides # pull newest image
docker stop openslides.vcp.sh #stop container
docker rm openslides.vcp.sh #remove container
$(dirname $0)/createOpenslidesDocker.sh #create the new container
````
