# Creates mail forward
We use this image https://github.com/zixia/docker-simple-mail-forwarder

```` bash
#!/bin/bash
source $(dirname $0)/config.cfg
SMF_CONFIG='test@test.vcp.sh:internet@vcp.sh'
docker create  -e SMF_CONFIG="$SMF_CONFIG" -p 25:25 zixia/simple-mail-forwarder

````
