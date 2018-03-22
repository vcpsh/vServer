#! /bin/bash

if [ "$1" == "" ] 
    then
    echo "Please provide the password for 'cn=admin' as the first parameter to this script."
    exit 1
fi
ldapadd -x -D cn=config -w $1 -f ./ldif/createVcpShSchema.ldif
ldapadd -x -D cn=config -w $1 -f ./ldif/ppolicy.ldif