# Update Image and Container
```` bash
#!/bin/bash

docker pull vcpsh/slapd # pull newest image
docker stop slapd # stop container
docker rm slapd # remove container
$(dirname $0)/createSlapdContainer.sh # create the new container
````
