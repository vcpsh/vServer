FROM openslides/openslides
RUN mkdir -p /app/personal_data/
RUN mkdir -p /app/openslides/static/img/
RUN ln -s /data /app/personal_data/var
RUN chmod -R 777 /app/personal_data/var
COPY /var/data/openslides.vcp.sh/logo-projector.png /app/openslides/core/static/img/logo-projector.png
VOLUME /data
ENTRYPOINT python /app/manage.py start
