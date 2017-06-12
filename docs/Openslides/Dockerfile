FROM openslides/openslides
RUN mkdir -p /app/personal_data/
RUN ln -s /data /app/personal_data/var
RUN chmod -R 777 /app/personal_data/var
RUN su mkdir -p /app/openslides/core/static/img/
COPY /var/data/openslides.vcp.sh/logo-projector.png /app/openslides/core/static/img/logo-projector.png
VOLUME /data
ENTRYPOINT python /app/manage.py start
