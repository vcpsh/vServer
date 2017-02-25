# update redis Container
```` bash
#!/bin/bash
docker pull redis # pull newest image
docker stop nextcloud-redis #stop container
docker rm nextcloud-redis #remove container
$(dirname $0)/createRedis-nextcloudContainer.sh #create the new container
````
