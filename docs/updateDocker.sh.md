#update all Docker container

Call update script and start all container

````bash
#!/bin/bash
./updateNginxReverseProxyContainer.sh
./updateMysqlDocker.sh
./updatePhpMyadmin.sh

./start.sh
````
