# Update icinga docker container


```` bash
#!/bin/bash
docker pull jordan/icinga2:latest # pull newest image
docker stop icinga.vcp-sh #stop container
docker rm icinga.vcp-sh #remove container
$(dirname $0)/createIcingaDocker.sh #create the new container
````
