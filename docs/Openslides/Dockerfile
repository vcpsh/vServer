FROM openslides/openslides
RUN mkdir -p /app/personal_data/var/
RUN ln /data /app/personal_data/var 
RUN chmod -R 777 /app/personal_data/var
VOLUME /app/personal_data/var
ENTRYPOINT python /app/manage.py start
