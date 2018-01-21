# Update docker container


```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
docker pull openslides/openslides # pull newest image
docker build --tag vcp-sh/openslides $(dirname $0)/../docs/docker/Openslides/
docker stop openslides.vcp.sh #stop container
docker rm openslides.vcp.sh #remove container
$(dirname $0)/createOpenslidesDocker.sh #create the new container
````
