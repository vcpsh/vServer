# Update vcp.sh docker container
This script updates the vcp.sh Container

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
docker pull zixia/simple-mail-forwarder # pull newest image
docker stop mail-forwarder #stop container
docker rm mail-forwarder #remove container
$(dirname $0)/createMailForwarderDocker.sh #create the new container
````
