# cn=config
To modify the openLDAP olc-config add a root login to your slapd config.

Apply the ldif with a command which i forgot...
```
dn: olcDatabase={0}config
changetype: modify
add: olcRootDN
olcRootDN: cn=config

dn: olcDatabase={0}config
changetype: modify
add: olcRootPW
olcRootPW: VerySuperSpecialSecurePassword

```
