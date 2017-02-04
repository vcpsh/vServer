#update all Docker container

Call update script and start all container

````bash
#!/bin/bash
$(dirname $0)/updateNginxReverseProxyContainer.sh
$(dirname $0)/updateMysqlDocker.sh
$(dirname $0)/updatePhpMyadmin.sh
$(dirname $0)/updateNextcloudDocker.sh
$(dirname $0)/updateVCP.shDocker.sh
$(dirname $0)/updatePfila.vcp.shDocker.sh
$(dirname $0)/updatePiwik.vcp.shDocker.sh
./start.sh
````
