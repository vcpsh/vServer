# Redis for nextcloud
Nexcloud can use redis and need the nextcloud container needs a redis server.
https://hub.docker.com/_/redis/

``` bash
#!/bin/bash
docker create --name nextcloud-redis redis


```
