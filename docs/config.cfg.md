# Config File
How to use it:
* Write your config file like the example below
* Import the config file with `source config.cfg` in your Bash file
* You can now use `$cool_configname`
* You can use ownconfig.cfg which will be included in config.cfg .
* Use this file for documentation which vars are available and for what they are
* Copy the file to `ownconfig.cfg.md` and set your own config

```` bash
domain=vcp-sh.de
sql_root_password=password
LETSENCRYPT_TEST=false #Create test certificate?
adminmail=internet@vcp-sh.de
debug=false
source ./ownconfig.cfg
````
