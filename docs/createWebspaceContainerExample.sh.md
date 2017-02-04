# create new user for webspace
``` bash
#!/bin/bash
USERNAME=$1
useradd -m $USERNAME
mkdir /home/$USERNAME/www/public
mkdir /var/data/$USERNAME
ln -s /home/$USERNAME/www /var/data/$USERNAME
```
