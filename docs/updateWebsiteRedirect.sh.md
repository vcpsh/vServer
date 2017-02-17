# Update Website direct
This script updates the vcp.sh Container

```` bash
#!/bin/bash
docker pull nginx:latest # pull newest image
docker stop website-redirects #stop container
docker rm website-redirects #remove container
$(dirname $0)/createWebsiteRedirects.sh #create the new container
````
