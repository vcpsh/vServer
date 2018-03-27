

``` bash
#!/bin/bash

# Skriptvorlage BorgBackup
# https://wiki.ubuntuusers.de/BorgBackup/
# https://borgbackup.readthedocs.io/en/stable/
source $(dirname $0)/config.cfg
export BORG_PASSPHRASE=$borg_passphrase
# Hier Pfad zum Sicherungsmedium angeben.
# z.B. zielpfad="/media/peter/HD_Backup"
zielpfad="ssh://pi@vcp-backup.dnshome.de/home/backup/backup"

# Hier Namen des Repositorys angeben.
# z.B. repository="borg"
repository="vcp-sh"

# Hier eine Liste mit den zu sichernden Verzeichnissen angeben
# z.B. sicherung="/home/peter/Bilder /home/peter/Videos --exclude *.tmp"
sicherung="/ --exclude *.tmp"

# Hier die Art der Verschlüsselung angeben
# z.B. verschluesselung="none"
verschluesselung="keyfile"

# Hier die Art der Kompression angeben
# z.B. kompression="none"
kompression="lzma"

# Hier angeben, ob vor der Ausführung von BorgBackup auf vorhandene Root-Rechte geprüft werden soll
# z.B. rootuser="ja"
rootuser="nein"

# Hier angeben nach welchem Schema alte Archive gelöscht werden sollen.
# Die Vorgabe behält alle Sicherungen des aktuellen Tages. Zusätzlich das aktuellste Archiv der
# letzten 7 Sicherungstage, der letzten 4 Wochen sowie der letzten 12 Monate.
pruning="--keep-within=1d --keep-daily=7 --keep-weekly=4 --keep-monthly=12"

###################################################################################################

mkdir -p /var/data/mysql/backup
docker exec mysql sh -c 'exec mysqldump --defaults-extra-file="/etc/mysql/conf.d/my.cnf" --all-databases --user=root ' > /var/data/mysql/backup/all-databases.sql
docker exec slapd sh -c 'exec /usr/sbin/slapcat  -v' >  /var/data/ldap/backup/ldap-backup.ldif
repopfad="$zielpfad"/"$repository"

# check for root
if [ $(id -u) -ne 0 ] && [ "$rootuser" == "ja" ]; then
  echo "Sicherung muss als Root-User ausgeführt werden." > /var/data/smarthost/temp/borg.out
  exit 1
fi

# Init borg-repo if absent
if [ ! -d $repopfad ]; then
  borg init --encryption=$verschluesselung $repopfad
  echo "Borg-Repository erzeugt unter $repopfad" >> /var/data/smarthost/temp/borg.out
fi

# backup data
SECONDS=0
echo "Start der Sicherung $(date)." > /var/data/smarthost/temp/borg.out

borg create --compression $kompression --exclude-caches --one-file-system -v --stats \
            $repopfad::'{hostname}-{now:%Y-%m-%d-%H%M%S}' $sicherung >> /var/data/smarthost/temp/borg.out 2>&1

echo "Ende der Sicherung $(date). Dauer: $SECONDS Sekunden" >> /var/data/smarthost/temp/borg.out

# prune archives
borg prune -v --list $repopfad --prefix '{hostname}-' $pruning >> /var/data/smarthost/temp/borg.out 2>&1

docker exec smarthost  /bin/sh -c 'mailx -s "subject" -r catchall@vcp.sh internet@vcp.sh < /temp/borg.out'

```
