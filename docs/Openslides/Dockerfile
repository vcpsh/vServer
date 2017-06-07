FROM ubuntu:latest
ENV RESETADMIN "/data/resetadmin"
RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install -y python3 python python-dev
RUN apt-get install -y python3-dev
RUN apt-get install -y python3-pip
RUN apt-get install -y curl
RUN apt-get install -y apt-utils wget
RUN apt-get install libssl-dev libffi-dev
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash
RUN apt-get install -y nodejs
RUN npm install -g bower
RUN python3 -m pip install --upgrade setuptools pip
RUN python3 -m pip install html5lib
python3 -m pip install -U Twisted[tls,http2]
RUN npm install -g @angular/cli
RUN wget https://files.openslides.org/releases/2.1.1/openslides-2.1.1.tar.gz
RUN python3 -m pip install openslides-2.1.1.tar.gz

RUN mkdir /data
RUN mkdir /data/config
RUN mkdir /data/share
RUN mkdir -p /root/.config
RUN mkdir -p /root/.local/share
RUN ln -s /data/config /root/.config/openslides
RUN ln -s /data/share /root/.local/share/openslides
RUN touch "$RESETADMIN"
VOLUME /data
EXPOSE 80

CMD test -e "$RESETADMIN" && openslides createsuperuser && rm "$RESETADMIN"; \
openslides runserver 0.0.0.0:80
