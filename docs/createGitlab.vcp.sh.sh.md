# Creates gitlab.vcp.sh container

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
mkdir -p /var/data/gitlab/config
mkdir -p /var/data/gitlab/logs
mkdir -p /var/data/gitlab/data
subdomains[0]="gitlab"

createDomainNames $subdomains
pushd `dirname $0` > /dev/null
SCRIPTPATH=`pwd -P` #Get the Fullpath
popd > /dev/null

docker create --name gitlab.vcp.sh \
    -e "VIRTUAL_HOST=$myresult" \
    -e "LETSENCRYPT_HOST=$myresult" \
    -e "LETSENCRYPT_EMAIL=$adminmail" \
    -e "HTTPS_METHOD=$HTTPS_METHOD" \
    --expose 80 \
    --publish 8022:22 \
    -v /var/data/gitlab/config:/etc/gitlab \
    -v /var/data/gitlab/logs:/var/log/gitlab \
    -v /var/data/gitlab/data:/var/opt/gitlab \
    gitlab/gitlab-ce:latest


#-e "VIRTUAL_PROTO=$VIRTUAL_PROTO" \
````
