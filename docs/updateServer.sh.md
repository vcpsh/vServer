# Update Script

This Script updates the server automaticaly.
* Start Backupscript
* Start update/update
* Start upgrade for Dockerfiles
* Restart Server

The Server has a entry in crontab for the docker start script

``` bash
#!/bin/bash
/bin/bash /home/internet/vServer/scripts/backup-script.sh
/bin/bash /home/internet/vServer/scripts/borg-backup.sh
apt-get update -y
apt-get upgrade -y
apt-get dist-upgrade -y
/bin/bash /home/internet/vServer/scripts/updateDocker.sh
/sbin/shutdown -r now

```
