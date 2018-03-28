#update all Docker container

Call update script and start all container.
It is not possible to link not running containers. Start the database and slapd container first.
Für jeden Container sollte sollte folgender String verwendet werden # 1 contain'er (ohne'). Falls eine update Skript zwei container enthält den String einfach doppelt hinter einander.
So kann man mit einer einfachen suche schnell heraus finden wie viele Container gerade aktiv sind.

```bash
#!/bin/bash
numberOfContainer=29

#export env vars for docker compose
source $(dirname $0)/config.cfg
export ADMIN_EMAIL=$adminmail
export HTTPS_METHOD=$HTTPS_METHOD
export ASPNETCORE_ENVIRONMENT=$ASPNETCORE_ENVIRONMENT
export ASPNETCORE_URLS=$ASPNETCORE_URLS

#networks
docker network create dotnet

#stop all running containers
docker stop $(docker ps -a -q)

$(dirname $0)/updateMysqlDocker.sh # 1 container
docker start mysql

$(dirname $0)/updateSlapdContainer.sh # 1 container
docker start slapd

# SingleSignOnServer
docker-compose -fdocker-compose.ssoserver.yml -f docker-compose.ssoserver.override.yml pull
docker-compose -f docker-compose.ssoserver.yml -f docker-compose.ssoserver.override.yml up -d # 1 container

$(dirname $0)/updateSmarthost.sh # 1 container
docker start smarthost

$(dirname $0)/updateNginxReverseProxyContainer.sh # 1 container # 1 container
docker start nginx-proxy
docker start letsencrypt

$(dirname $0)/updatePiwik.vcp.shDocker.sh # 1 container
docker start piwik.vcp.sh
$(dirname $0)/updatePhpMyadmin.sh # 1 container
docker start sqladmin
$(dirname $0)/updateOpenSlidesDocker.sh # 1 container
docker start openslides.vcp.sh
$(dirname $0)/updateDiefalken.vcp.shDocker.sh # 1 container
docker start diefalken.vcp.sh
# archived
# $(dirname $0)/updateFreepolisContainer.sh
# docker start freepolis.vcp.sh
$(dirname $0)/updateAverliekers.vcp.shDocker.sh # 1 container
docker start averliekers.vcp.sh
$(dirname $0)/updateUrlShortener.sh # 1 container
docker start s.vcp.sh
$(dirname $0)/updateGruppenverwaltungContainer.sh # 1 container
docker start gruppenverwaltung
$(dirname $0)/updateLists.vcp.sh.sh # 1 container
docker start lists.vcp.sh

$(dirname $0)/updateCommunity.vcp.shDocker.sh # 1 container
docker start community.vcp.sh
$(dirname $0)/updateRedis-nextcloudContainer.sh # 1 container
docker start nextcloud-redis

$(dirname $0)/updateNextcloudDocker.sh # 1 container
docker start nextcloud
$(dirname $0)/updatePfila.vcp.shDocker.sh # 1 container
docker start pfila.vcp.sh
$(dirname $0)/updateCollabora.vcp.sh # 1 container # 1 container
$(dirname $0)/updateGitlab.vcp.sh.sh # 1 container
$(dirname $0)/updateVCP.shDocker.sh # 1 container
docker start vcp.sh
$(dirname $0)/updateAlderaan.vcp.shDocker.sh # 1 container
docker start alderaan.vcp.sh
$(dirname $0)/updateSteveBiko.vcp.shDocker.sh # 1 container
docker start stevebiko.vcp.sh
$(dirname $0)/updateMailForwarder.sh # 1 container
docker start mail-forwarder

$(dirname $0)/updateWebsiteRedirect.sh # 1 container # 1 container
docker start website-redirects
docker start website-redirects-two
$(dirname $0)/updateGraphiteDocker.sh # 1 container
docker start graphite
$(dirname $0)/updateIcingaDocker.sh # 1 container
docker start icinga.vcp.sh

#$(dirname $0)/start.sh
function countContainers() {
        docker ps -q $1 | wc -l
}

runningContainer=$(countContainers);
if [ $numberOfContainer -eq $runningContainer ]
then
        docker system prune -af
fi
```
