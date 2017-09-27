# Creates mail forward
We use this image https://github.com/zixia/docker-simple-mail-forwarder

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
SMF_RELAYHOST='smarthost'

docker pull vcpsh/simple-mail-forwarder

docker create --name "mail-forwarder" \
    -e SMF_RELAYHOST=$SMF_RELAYHOST \
    -e SMF_CONFIG="$SMF_CONFIG" \
    -p 25:25 \
    --link smarthost:smarthost \
    vcpsh/simple-mail-forwarder
````

#main.cf
sender_canonical_maps = regexp:/etc/postfix/sender_canonical_maps
#sender_canonical_maps
/.+/  relay@vcp.sh
