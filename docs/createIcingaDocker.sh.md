# Icinga
Monitoring Software
https://hub.docker.com/r/jordan/icinga2/
Creates a config file for ssmtp in /var/data/icinga.vcp.sh/conf/ssmtp.conf

``` bash
#!/bin/bash
source $(dirname $0)/config.cfg

mkdir -p /var/data/icinga.vcp.sh/
mkdir -p /var/data/icinga.vcp.sh/sql
mkdir -p /var/data/icinga.vcp.sh/conf/icinga/
mkdir -p /var/data/icinga.vcp.sh/log
#mailserver definition
echo "
root=relay@vcp.sh
mailhub=mxf960.netcup.net:587
UseSTARTTLS=YES
AuthUser=relay@vcp.sh
AuthPass=$smarthost_password
FromLineOverride=NO
" > /var/data/icinga.vcp.sh/conf/ssmtp.conf

#remapping unix mails
echo "root:relay@vcp.sh:mxf960.netcup.net
nagios:relay@vcp.sh:mxf960.netcup.net
www-data:relay@vcp.sh:mxf960.netcup.net" > /var/data/icinga.vcp.sh/conf/revaliases

#User definition
echo "/**
 * The example user 'icingaadmin' and the example
 * group 'icingaadmins'.
 */

object User \"icingaadmin\" {
  import \"generic-user\"

  display_name = \"Icinga 2 Admin\"
  groups = [ \"icingaadmins\" ]

  email = \"internet@vcp.sh\"
}

object UserGroup \"icingaadmins\" {
  display_name = \"Icinga 2 Admin Group\"
}
" > /var/data/icinga.vcp.sh/conf/icinga/users.conf

echo "object ApiUser \"icinga2-director\" {
  password = \"$icingaapipassword\"
  permissions = [ \"*\" ]
}
" > /var/data/icinga.vcp.sh/conf/icinga/api-user.conf

echo "/**
 * The APIUser objects are used for authentication against the API.
 */
object ApiUser \"root\" {
  password = \"$icingaapipassword\"
  // client_cn = \"\"

  permissions = [ \"*\" ]
}
" > /var/data/icinga.vcp.sh/conf/icinga/api-users.conf


echo "object IcingaApplication \"app\" { }
" > /var/data/icinga.vcp.sh/conf/icinga/app.conf

echo "apply Service \"apt\" {
  import \"generic-service\"

  check_command = \"apt\"

  assign where host.name == NodeName
}
" > /var/data/icinga.vcp.sh/conf/icinga/apt.conf
echo "/* Command objects */

object NotificationCommand \"mail-host-notification\" {
  command = [ SysconfDir + \"/icinga2/scripts/mail-host-notification.sh\" ]

  env = {
    NOTIFICATIONTYPE = \"$notification.type$\"
    HOSTALIAS = \"$host.display_name$\"
    HOSTADDRESS = \"$address$\"
    HOSTSTATE = \"$host.state$\"
    LONGDATETIME = \"$icinga.long_date_time$\"
    HOSTOUTPUT = \"$host.output$\"
    NOTIFICATIONAUTHORNAME = \"$notification.author$\"
    NOTIFICATIONCOMMENT = \"$notification.comment$\"
    HOSTDISPLAYNAME = \"$host.display_name$\"
    USEREMAIL = \"$user.email$\"
  }
}
object NotificationCommand \"mail-service-notification\" {
  command = [ SysconfDir + \"/icinga2/scripts/mail-service-notification.sh\" ]

  env = {
    NOTIFICATIONTYPE = \"$notification.type$\"
    SERVICEDESC = \"$service.name$\"
    HOSTALIAS = \"$host.display_name$\"
    HOSTADDRESS = \"$address$\"
    SERVICESTATE = \"$service.state$\"
    LONGDATETIME = \"$icinga.long_date_time$\"
    SERVICEOUTPUT = \"$service.output$\"
    NOTIFICATIONAUTHORNAME = \"$notification.author$\"
    NOTIFICATIONCOMMENT = \"$notification.comment$\"
    HOSTDISPLAYNAME = \"$host.display_name$\"
    SERVICEDISPLAYNAME = \"$service.display_name$\"
    USEREMAIL = \"$user.email$\"
  }
}

" > /var/data/icinga.vcp.sh/conf/icinga/commands.conf


echo "/**
 * Host group examples.
 */

object HostGroup \"linux-servers\" {
  display_name = \"Linux Servers\"

  assign where host.vars.os == \"Linux\"
}

object HostGroup \"windows-servers\" {
  display_name = \"Windows Servers\"

  assign where host.vars.os == \"Windows\"
}

/**
 * Service group examples.
 */

object ServiceGroup \"ping\" {
  display_name = \"Ping Checks\"

  assign where match(\"ping*\", service.name)
}

object ServiceGroup \"http\" {
  display_name = \"HTTP Checks\"

  assign where match(\"http*\", service.check_command)
}

object ServiceGroup \"disk\" {
  display_name = \"Disk Checks\"

  assign where match(\"disk*\", service.check_command)
}
"  > /var/data/icinga.vcp.sh/conf/icinga/groups.conf


echo "/*
 * Host definitions with object attributes
 * used for apply rules for Service, Notification,
 * Dependency and ScheduledDowntime objects.
 *
 * Tip: Use 'icinga2 object list --type Host' to
 * list all host objects after running
 * configuration validation ('icinga2 daemon -C').
 */

/*
 * This is an example host based on your
 * local host's FQDN. Specify the NodeName
 * constant in 'constants.conf' or use your
 * own description, e.g. \"db-host-1\".
 */

object Host NodeName {
  /* Import the default host template defined in 'templates.conf'. */
  import \"generic-host\"

  /* Specify the address attributes for checks e.g. 'ssh' or 'http'. */
  address = \"127.0.0.1\"
  address6 = \"::1\"

  /* Set custom attribute 'os' for hostgroup assignment in 'groups.conf'. */
  vars.os = \"Linux\"

  /* Define http vhost attributes for service apply rules in 'services.conf'. */
  vars.http_vhosts[\"http\"] = {
    http_uri = \"/\"
  }
  /* Uncomment if you've sucessfully installed Icinga Web 2. */
  //vars.http_vhosts[\"Icinga Web 2\"] = {
  //  http_uri = \"/icingaweb2\"
  //}

  /* Define disks and attributes for service apply rules in 'services.conf'. */
  vars.disks[\"disk\"] = {
    /* No parameters. */
  }
  vars.disks[\"disk /\"] = {
    disk_partitions = \"/\"
  }

  /* Define notification mail attributes for notification apply rules in 'notifications.conf'. */
  vars.notification[\"mail\"] = {
    /* The UserGroup 'icingaadmins' is defined in 'users.conf'. */
    groups = [ \"icingaadmins\" ]
  }
}

" > /var/data/icinga.vcp.sh/conf/icinga/hosts.conf

echo "/**
 * The example notification apply rules.
 *
 * Only applied if host/service objects have
 * the custom attribute 'notification' defined
 * and containing 'mail' as key.
 *
 * Check 'hosts.conf' for an example.
 */

apply Notification \"mail-icingaadmin\" to Host {
  import \"mail-host-notification\"

  user_groups = host.vars.notification.mail.groups
  users = host.vars.notification.mail.users

  assign where host.vars.notification.mail
}

apply Notification \"mail-icingaadmin\" to Service {
  import \"mail-service-notification\"

  user_groups = host.vars.notification.mail.groups
  users = host.vars.notification.mail.users

  assign where host.vars.notification.mail
}
" > /var/data/icinga.vcp.sh/conf/icinga/notifications.conf

echo "/*
 * Host and Service templates for the Agent Setup.
 */


/**
 * Provides settings for satellite hosts managed by 'icinga2 repository'.
 * Define your global attributes here, for example custom
 * attributes used for notifications, etc.
 */
template Host \"satellite-host\" {
  vars.notification[\"mail\"] = {
    groups = [ \"icingaadmins\" ]
  }
}

/**
 * Provides settings for satellite services managed by 'icinga2 repository'.
 * Define your global satellite attributes here, for example custom
 * attributes used for notifications, etc.
 */
template Service \"satellite-service\" {
  vars.notification[\"mail\"] = {
    groups = [ \"icingaadmins\" ]
  }
}


apply Dependency \"satellite-host\" to Host {
  parent_host_name = host.zone

  assign where host.zone != \"\" && \"satellite-host\" in host.templates
}
" > /var/data/icinga.vcp.sh/conf/icinga/satellite.conf



echo "/*
 * Service apply rules.
 *
 * The CheckCommand objects 'ping4', 'ping6', etc
 * are provided by the plugin check command templates.
 * Check the documentation for details.
 *
 * Tip: Use 'icinga2 object list --type Service' to
 * list all service objects after running
 * configuration validation ('icinga2 daemon -C').
 */

/*
 * This is an example host based on your
 * local host's FQDN. Specify the NodeName
 * constant in 'constants.conf' or use your
 * own description, e.g. \"db-host-1\".
 */

/*
 * These are generic 'ping4' and 'ping6'
 * checks applied to all hosts having the
 * 'address' resp. 'address6' attribute
 * defined.
 */
apply Service \"ping4\" {
  import \"generic-service\"

  check_command = \"ping4\"

  assign where host.address
}

apply Service \"ping6\" {
  import \"generic-service\"

  check_command = \"ping6\"

  assign where host.address6
}

/*
 * Apply the 'ssh' service to all hosts
 * with the 'address' attribute defined and
 * the custom attribute 'os' set to 'Linux'.
 */
apply Service \"ssh\" {
  import \"generic-service\"

  check_command = \"ssh\"

  assign where (host.address || host.address6) && host.vars.os == \"Linux\"
}



apply Service for (http_vhost => config in host.vars.http_vhosts) {
  import \"generic-service\"

  check_command = \"http\"

  vars += config
}

apply Service for (disk => config in host.vars.disks) {
  import \"generic-service\"

  check_command = \"disk\"

  vars += config
}

apply Service \"icinga\" {
  import \"generic-service\"

  check_command = \"icinga\"

  assign where host.name == NodeName
}

apply Service \"load\" {
  import \"generic-service\"

  check_command = \"load\"

  /* Used by the ScheduledDowntime apply rule in 'downtimes.conf'. */
  vars.backup_downtime = \"02:00-03:00\"

  assign where host.name == NodeName
}

apply Service \"procs\" {
  import \"generic-service\"

  check_command = \"procs\"

  assign where host.name == NodeName
}

apply Service \"swap\" {
  import \"generic-service\"

  check_command = \"swap\"

  assign where host.name == NodeName
}

apply Service \"users\" {
  import \"generic-service\"

  check_command = \"users\"

  assign where host.name == NodeName
}
" > /var/data/icinga.vcp.sh/conf/icinga/services.conf

echo "/**
 * Sample timeperiods for Icinga 2 requiring
 * 'legacy-timeperiod' template from the Icinga
 * Template Library (ITL).
 * Check the documentation for details.
 */

object TimePeriod \"24x7\" {
  import \"legacy-timeperiod\"

  display_name = \"Icinga 2 24x7 TimePeriod\"
  ranges = {
    \"monday\" 	= \"00:00-24:00\"
    \"tuesday\" 	= \"00:00-24:00\"
    \"wednesday\" = \"00:00-24:00\"
    \"thursday\" 	= \"00:00-24:00\"
    \"friday\" 	= \"00:00-24:00\"
    \"saturday\" 	= \"00:00-24:00\"
    \"sunday\" 	= \"00:00-24:00\"
  }
}

object TimePeriod \"9to5\" {
  import \"legacy-timeperiod\"

  display_name = \"Icinga 2 9to5 TimePeriod\"
  ranges = {
    \"monday\" 	= \"09:00-17:00\"
    \"tuesday\" 	= \"09:00-17:00\"
    \"wednesday\" = \"09:00-17:00\"
    \"thursday\" 	= \"09:00-17:00\"
    \"friday\" 	= \"09:00-17:00\"
  }
}

object TimePeriod \"never\" {
  import \"legacy-timeperiod\"

  display_name = \"Icinga 2 never TimePeriod\"
  ranges = {
  }
}
" > /var/data/icinga.vcp.sh/conf/icinga/timeperiods.conf


subdomains[0]="icinga"
subdomains[1]="monitoring"
createDomainNames $subdomains

docker create \
 --expose 80 \
 --name icinga.vcp.sh \
 -e "VIRTUAL_HOST=$myresult" \
 -e "LETSENCRYPT_HOST=$myresult" \
 -e "LETSENCRYPT_EMAIL=$adminmail" \
 --link graphite:graphite \
  -e ICINGA2_FEATURE_GRAPHITE=true \
  -e ICINGA2_FEATURE_GRAPHITE_HOST=graphite \
  -e ICINGA2_FEATURE_GRAPHITE_PORT=2003 \
  -e "ICINGA2_FEATURE_GRAPHITE_URL=http://graphite" \
  -e "ICINGA_PASSWORD=$ICINGA_PASSWORD" \
  -e "ICINGAWEB2_PASSWORD=$ICINGAWEB2_PASSWORD" \
  -e "DIRECTOR_PASSWORD=$DIRECTOR_PASSWORD" \
  -e "IDO_PASSWORD=$IDO_PASSWORD" \
  -e "ICINGAWEB2_ADMIN_USER=admin" \
  -e "ICINGAWEB2_ADMIN_PASS=$ICINGAWEB2_ADMIN_PASS" \
  -v /var/data/icinga.vcp.sh/sql:/var/lib/mysql \
  -v /var/data/icinga.vcp.sh/conf/ssmtp.conf:/etc/ssmtp/ssmtp.conf:ro \
  -v /var/data/icinga.vcp.sh/conf/revaliases:/etc/ssmtp/revaliases:ro \
  -v /var/data/icinga.vcp.sh/log/:/var/log/ \
  -v /var/data/icinga.vcp.sh/conf/icinga:/etc/icinga2/conf.d/:rw \
  jordan/icinga2:latest

```
