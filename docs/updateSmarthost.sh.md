# Update Smarthost docker container
This script updates the vcp.sh Container

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
docker pull lirt/smart-host-postfix-docker # pull newest image
docker stop smarthost #stop container
docker rm smarthost #remove container
$(dirname $0)/createSmartHostDocker.sh #create the new container
````
