# Update piwik.vcp.sh docker container

This script updates the piwik.vcp.sh Container

```bash
#!/bin/bash
source $(dirname $0)/config.cfg
docker pull piwik:latest # pull newest image
docker stop piwik.vcp.sh #stop container
docker rm piwik.vcp.sh #remove container
$(dirname $0)/createPiwik.vcp.shDocker.sh #create the new container
```
