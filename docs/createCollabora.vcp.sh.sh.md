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
    -e 'domain=cloud\\.vcp\\.sh' \
    --expose 9980 \
    --cap-add MKNOD \
    collabora/code

  docker create --name collabora-nginx.vcp.sh \
        -e "VIRTUAL_HOST=$myresult" \
        -e "LETSENCRYPT_HOST=$myresult" \
        -e "LETSENCRYPT_EMAIL=$adminmail" \
        -e "HTTPS_METHOD=$HTTPS_METHOD" \
        -v $(dirname $0)/collaboraNginx.conf:/etc/nginx/nginx.conf:ro \
        --link collabora.vcp.sh:collabora \
        --expose 80 \
        nginx

#-e "VIRTUAL_PROTO=$VIRTUAL_PROTO" \
````
