#! /bin/bash

if [ "$1" == "" ] 
    then
    echo "Please provide the password for 'cn=admin' as the first parameter to this script."
    exit 1
fi
# ldapdelete -x -D cn=config -w $1 cn={5}vcp.sh,cn=schema,cn=config
ldapmodify -x -D cn=config -w $1 -f ./cn\={5}vcp.sh.ldif

# restart slapd to activate changes
docker stop slapd
docker start slapd