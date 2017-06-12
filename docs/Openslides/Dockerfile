FROM openslides/openslides
RUN mkdir -p /app/personal_data/
RUN ln -s /data /app/personal_data/var
RUN chmod -R 777 /app/personal_data/var
USER 0
RUN chmod -R 777 /app/
VOLUME /data
ENTRYPOINT python /app/manage.py start
