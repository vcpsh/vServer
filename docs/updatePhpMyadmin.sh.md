# Update Image and Container
```` bash
#!/bin/bash

docker pull phpmyadmin/phpmyadmin # ṕull newest image
docker stop sqladmin #stop container
docker rm sqladmin #remove container
$(dirname $0)/createPhpMyAdmin.sh #create the new container
````
