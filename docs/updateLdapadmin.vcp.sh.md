# Update alderaan.vcp.sh container
This script updates the Container

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
docker stop ldapadmin.vcp.sh #stop container
docker rm ldapadmin.vcp.sh #remove container
$(dirname $0)/createLdapadmin.vcp.sh #create the new container
docker start ldapadmin.vcp.sh
````
