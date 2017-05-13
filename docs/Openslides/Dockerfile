FROM python:latest
ENV RESETADMIN "/data/resetadmin"
RUN pip install --upgrade setuptools pip
RUN pip install openslides
RUN pip install html5lib
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
