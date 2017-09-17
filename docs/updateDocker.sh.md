#update all Docker container

Call update script and start all container.
It is not possible to link not running containers. Start the database and slapd container first.
```bash
#!/bin/bash
numberOfContainer=25

#stop all running containers
docker stop $(docker ps -a -q)

$(dirname $0)/updateMysqlDocker.sh
docker start mysql
$(dirname $0)/updateSlapdContainer.sh
docker start slapd
#temporary deactivated smarthost update to prevent mail-forwarder from breaking
#$(dirname $0)/updateSmarthost.sh
docker start smarthost

$(dirname $0)/updateNginxReverseProxyContainer.sh
docker start nginx-proxy
docker start letsencrypt

$(dirname $0)/updatePiwik.vcp.shDocker.sh
docker start piwik.vcp.sh
$(dirname $0)/updatePhpMyadmin.sh
docker start sqladmin
$(dirname $0)/updateOpenSlidesDocker.sh
docker start openslides.vcp.sh
$(dirname $0)/updateDiefalken.vcp.shDocker.sh
docker start diefalken.vcp.sh
$(dirname $0)/updateFreepolisContainer.sh
docker start freepolis.vcp.sh
$(dirname $0)/updateAverliekers.vcp.shDocker.sh
docker start averliekers.vcp.sh
$(dirname $0)/updateUrlShortener.sh
docker start s.vcp.sh
$(dirname $0)/updateGruppenverwaltungContainer.sh
docker start gruppenverwaltung
$(dirname $0)/updateLists.vcp.sh.sh
docker start lists.vcp.sh

$(dirname $0)/updateCommunity.vcp.shDocker.sh
docker start community.vcp.sh
$(dirname $0)/updateRedis-nextcloudContainer.sh
docker start nextcloud-redis

$(dirname $0)/updateNextcloudDocker.sh
docker start nextcloud
$(dirname $0)/updatePfila.vcp.shDocker.sh
docker start pfila.vcp.sh

$(dirname $0)/updateVCP.shDocker.sh
docker start vcp.sh
$(dirname $0)/updateAlderaan.vcp.shDocker.sh
docker start alderaan.vcp.sh
#$(dirname $0)/updateMailForwarder.sh
docker start mail-forwarder

$(dirname $0)/updateWebsiteRedirect.sh
#docker start website-redirects

$(dirname $0)/updateGraphiteDocker.sh
docker start graphite
$(dirname $0)/updateIcingaDocker.sh
docker start icinga.vcp.sh

#$(dirname $0)/start.sh
function countContainers() {
        docker ps -q $1 | wc -l
}

runningContainer=$(countContainers);
#if [ $numberOfContainer -eq $runningContainer ]
#then
# docker system prune -af
#fi
````
