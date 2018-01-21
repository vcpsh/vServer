# Smart Host Docker container
This one: https://hub.docker.com/r/lirt/smart-host-postfix-docker/

``` bash
source $(dirname $0)/config.cfg

docker create \
   --name smarthost \
   -e HOSTNAME="smarthost.vcp.sh" \
   -e EXIM_SMARTHOST=mxf960.netcup.net:25 \
   -e EXIM_PASSWORD=mxf960.netcup.net:$smarthost_username:$smarthost_password \
   -e EXIM_ALLOWED_SENDERS=172.17.0.0/24:127.0.0.1 \
    imixs/exim4


```
docker run --name="smarthost" -d \
-e EXIM_SMARTHOST="target.mail.server.example:25" \
-e EXIM_PASSWORD="target.mail.server.example:login:password" \
imixs/smarthost


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
