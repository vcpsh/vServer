````
server {
    listen       80;
    server_name  collabora.vcp.sh;


    # static files
    location ^~ /loleaflet {
        proxy_pass https://collabora:9980;
        proxy_set_header Host $http_host;
    }

    # WOPI discovery URL
    location ^~ /hosting/discovery {
        proxy_pass https://collabora:9980;
        proxy_set_header Host $http_host;
    }

   # main websocket
   location ~ ^/lool/(.*)/ws$ {
       proxy_pass https://collabora:9980;
       proxy_set_header Host $http_host;
       proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
       proxy_read_timeout 36000s;
   }

   # download, presentation and image upload
   location ~ ^/lool {
       proxy_pass https://collabora:9980;
       proxy_set_header Host $http_host;
   }

   # Admin Console websocket
   location ^~ /lool/adminws {
       proxy_pass https://collabora:9980;
       proxy_set_header Host $http_host;
       proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
       proxy_read_timeout 36000s;
   }
}
````
