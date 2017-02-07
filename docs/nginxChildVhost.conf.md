# Additional config to pretend error
Described here: http://stackoverflow.com/questions/10395807/nginx-close-upstream-connection-after-request

For this image the config file has to be copied to /opt/docker/etc/nginx/vhost.common.d/

``` config
location / {
    try_files $uri $uri/ /index.php?$query_string;
    proxy_http_version 1.1;
    proxy_set_header Connection "";
}


```
