# Update Graphite docker container


```` bash
#!/bin/bash
docker pull hopsoft/graphite-statsd # pull newest image
docker stop graphite #stop container
docker rm graphite #remove container
$(dirname $0)/createGraphiteDocker.sh #create the new container
````
