#update all Docker container

Call update script and start all container.
It is not possible to link not running containers. Start the database and slapd container first.
````bash
#!/bin/bash
$(dirname $0)/updateMysqlDocker.sh
$(dirname $0)/updateSlapdContainer.sh

docker start mysql
docker start slapd

$(dirname $0)/updateNginxReverseProxyContainer.sh

$(dirname $0)/updatePiwik.vcp.shDocker.sh
$(dirname $0)/updatePhpMyadmin.sh

$(dirname $0)/updateDiefalken.vcp.shDocker.sh
$(dirname $0)/updateFreepolisContainer.sh

$(dirname $0)/updateCommunity.vcp.shDocker.sh
$(dirname $0)/updateNextcloudDocker.sh
$(dirname $0)/updatePfila.vcp.shDocker.sh

$(dirname $0)/updateVCP.shDocker.sh

$(dirname $0)/updateMailForwarder.sh
$(dirname $0)/updateSmarthost.sh
$(dirname $0)/updateWebsiteRedirect.sh

$(dirname $0)/start.sh
````
