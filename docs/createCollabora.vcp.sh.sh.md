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
    -e 'domain=cloud\\.vcp\\.sh|cloud\\.vcp-sh\\.de|nextcloud\\.vcp\\.sh|nextcloud\\.vcp-sh\\.de|c\\.vcp\\.sh|c\\.vcp-sh\\.de|pfadicloud\\.vcp\\.sh|pfadicloud\\.vcp-sh\\.de' \
    --expose 9980 \
    --cap-add MKNOD \
    collabora/code

  docker create --name collabora-nginx.vcp.sh \
        -e "VIRTUAL_HOST=$myresult" \
        -e "LETSENCRYPT_HOST=$myresult" \
        -e "LETSENCRYPT_EMAIL=$adminmail" \
        -e "HTTPS_METHOD=$HTTPS_METHOD" \
        -v /home/internet/vServer/scripts/collaboraNginx.conf:/etc/nginx/conf.d/default.conf:ro \
        --link collabora.vcp.sh:collabora \
        --expose 80 \
        nginx

#-e "VIRTUAL_PROTO=$VIRTUAL_PROTO" \
````
