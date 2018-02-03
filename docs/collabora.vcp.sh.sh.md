# Creates lists.vcp.sh container
We use this image https://hub.docker.com/r/webdevops/php-nginx/

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
    -e 'domain=cloud\\.vcp\\.sh' \
    -e "LETSENCRYPT_HOST=$myresult" \
    -e "LETSENCRYPT_EMAIL=$adminmail" \
    -e "HTTPS_METHOD=$HTTPS_METHOD" \
    --cap-add MKNOD \
    --expose 80 \
    collabora/code
#-e "VIRTUAL_PROTO=$VIRTUAL_PROTO" \
````
docker run -t -d -p 127.0.0.1:9980:9980 -e 'domain=cloud\\.nextcloud\\.com' --restart always  collabora/code
