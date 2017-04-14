# IPv6 and Networking

## host
The network configuration is in /etc/interfaces/network
We got a /64 subnet from the provider
A /80 is for the Server ::/80 and :1::/80 is for docker container
To add a new IPv6 see: https://www.netcup-wiki.de/wiki/Zus%c3%a4tzliche_IP_Adresse_konfigurieren#IPv6%7C

## docker
How IPv6 works with docker is described here https://docs.docker.com/engine/userguide/networking/default_network/ipv6

| IP | Container |
|----|------|
| 1 | nginx-proxy |
