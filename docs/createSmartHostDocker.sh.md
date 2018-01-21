# Smart Host Docker container
This one: https://hub.docker.com/r/lirt/smart-host-postfix-docker/

``` bash
source $(dirname $0)/config.cfg

docker create \
   --name smarthost \
   -h smarthost.vcp.sh \
   -p 8025:25 \
   -e HOSTNAME="smarthost.vcp.sh" \
   -e RELAY_HOST=mxf960.netcup.net \
   -e USERNAME=$smarthost_username \
   -e PASSWORD="$smarthost_password" \
   -e MYNETWORKS="172.17.0.0/24 172.20.100.0/24 172.20.101.12 172.20.101.13" \
    lirt/smart-host-postfix-docker


```
