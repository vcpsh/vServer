# Single-Sign-On-Server

This is the docker-compose file for our single-sign-on server.

```yml
version: '3.4'

services:
  sh.vcp.sso.server:
    image: vcpsh/ssoserver
    networks:
      - dotnet
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
networks:
  dotnet:
   external:
      name: dotnet
```
