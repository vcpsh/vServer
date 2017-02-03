# update images of the reverse proxy and lets encrypt

Pull the newest image. Stop and delete the old container
create the new container
````bash
#!/bin/bash
docker pull jwilder/nginx-proxy
docker stop nginx-proxy
docker rm nginx-proxy
docker pull jrcs/letsencrypt-nginx-proxy-companion
docker stop letsencrypt
docker rm letsencrypt
$(dirname $0)./createNginxReverseProxyContainer.sh
````
