# Startskript
This scripts start all Services

- nginx-proxy
- letsencrypt container


``` bash
#!/bin/bash
docker start nginx-proxy
docker start letsencrypt
```
