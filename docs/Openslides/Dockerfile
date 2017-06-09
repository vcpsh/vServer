FROM openslides/openslides
RUN ln -s /app/personal_data/var/ /data/
RUN chmod -R 777 /app/personal_data/var
VOLUME /app/personal_data/var
ENTRYPOINT python /app/manage.py start
