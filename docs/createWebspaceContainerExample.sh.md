# create new user for webspace
``` bash
#!/bin/bash
USERNAME=$1
useradd -m $USERNAME
mkdir -p /home/$USERNAME/www/public
mkdir -p /var/data/$USERNAME
ln -s /home/$USERNAME/www /var/data/$USERNAME
```
