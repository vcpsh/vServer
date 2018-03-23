#! /bin/bash

slaptest -f conversion.conf -F .
cp ./cn\=config/cn\=schema/cn\={4}vcp.ldif ./cn\={5}vcp.sh.ldif
rm -r ./cn\=config
rm ./cn\=config.ldif

# sed -i "" -e "/^olc\w*\|^olc\w*/!d" cn=\{5}vcp.sh.ldif
