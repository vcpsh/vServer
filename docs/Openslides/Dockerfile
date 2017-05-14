FROM ubuntu:latest
ENV RESETADMIN "/data/resetadmin"
RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install -y python3
RUN apt-get install -y python3-dev
RUN apt-get install -y nodejs npm
RUN npm install -g bower
RUN pip install --upgrade setuptools pip
RUN pip install html5lib
RUN npm install -g @angular/cli
RUN wget https://files.openslides.org/releases/2.1.1/openslides-2.1.1.tar.gz
RUN pip install openslides-2.1.1.tar.gz
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
