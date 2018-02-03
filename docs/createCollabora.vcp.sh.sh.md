# Creates collabora.vcp.sh container


```` bash
#!/bin/bash
source $(dirname $0)/config.cfg

subdomains[0]="collabora"


createDomainNames $subdomains
pushd `dirname $0` > /dev/null
SCRIPTPATH=`pwd -P` #Get the Fullpath
popd > /dev/null

docker create --name collabora.vcp.sh \
    -e "VIRTUAL_HOST=$myresult" \
    -e "LETSENCRYPT_HOST=$myresult" \
    -e "LETSENCRYPT_EMAIL=$adminmail" \
    -e "HTTPS_METHOD=$HTTPS_METHOD" \
    -e 'domain=collabora\\.vcp\\.sh' \
    -p 9980:9980 \
    --cap-add MKNOD \
    collabora/code

#-e "VIRTUAL_PROTO=$VIRTUAL_PROTO" \
````
