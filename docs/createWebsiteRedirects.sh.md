# Website redirects



```bash
#!/bin/bash
source $(dirname $0)/config.cfg

#parameter 1 from, #parameter 2 to
function createServerBlock {

  domainfrom=$1
  domainTo=$2
  blockstring="server {
      server_name $domainfrom;
      listen 80;
      return 301 \$scheme://$domainTo\$request_uri;
  }"
}


config="http { "
domainlistfrom=""
IFS=';' read -ra WEBSITES <<< "$REDIRECTDOMAINS"

for WEBSITE in "${WEBSITES[@]}"; do
    IFS=':' read -ra innerBlock <<< "$WEBSITE"
    to="${innerBlock[1]}"
    IFS=',' read -ra  domainsto<<< "$innerBlock"

    for FROM in "${domainsto[@]}"; do
      createServerBlock $FROM $to
      config="$config $blockstring"
      domainlistfrom="$domainlistfrom $FROM,"

    done
done
domainlistfrom="${domainlistfrom%?}"
config="$config }"
#echo $config
#echo $domainlistfrom

mkdir -p /var/data/websiteRedirects
echo "$config" > /var/data/websiteRedirects/nginx.conf

docker create --name website-redirects -e "VIRTUAL_HOST=$domainlistfrom" --expose 80 -v /var/data/websiteRedirects/nginx.conf:/etc/nginx/nginx.conf:ro nginx:latest



```
