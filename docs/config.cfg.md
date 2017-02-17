# Config File
How to use it:
* Write your config file like the example below
* Import the config file with `source config.cfg` in your Bash file
* You can now use `$cool_configname`
* You can use ownconfig.cfg which will be included in config.cfg .
* Use this file for documentation which vars are available and for what they are
* Copy the file to `ownconfig.cfg.md` and set your own config

```` bash
#Domain stuff
domains[0]=vcp.sh
domains[1]=vcp-sh.de
VIRTUAL_PROTO=https

REDIRECTDOMAINS="Domain1from, domain2from:domain1to;domain11from:domain2to"



org_name="\"VCP Schleswig-Holstein\""
#Letsencrypt
LETSENCRYPT_TEST=false #Create test certificate?
adminmail=internet@vcp-sh.de
debug=false


sql_root_password=password

#nextcloud
nextcloud_password=superpasswordisbetterthannormalpassword
nextcloud_db_user=nextcloud
nextcloud_db_name=nextcloud
nextcloud_db_password=anotherstrongpassword
nextcloud_uid=1000
nextcloud_gid=1000
nextcloud_tag=11.0 #tag for the containter

#Smarthost stuff
smarthost_password=wedontneednopassword
smarthost_username="catchall@vcp.sh"
SMF_CONFIG=""

#Input Array of Subdomains,
#Output: String subdomain1.domain1, ... ,subdomain1.domainN,..., subdomainMdomainN
function createDomainNames {
  domainstring=""
  subdomains=$1
  for subdomain in "${subdomains[@]}"
    do
      for domain in "${domains[@]}"
      do
        domainstring="$domainstring $subdomain.$domain,"
      done
  done
  myresult=${domainstring%?}

}
#subdomains[0]="test1"
#subdomains[1]="test2"
#createDomainNames $subdomains
#echo $myresult
source $(dirname $0)/ownconfig.cfg #Import your own config. Mind delete this line in your own config.
````
