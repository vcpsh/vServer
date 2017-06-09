FROM openslides/openslides
RUN ln -s /app/personal_data/var/ /data/ 
VOLUME /app/personal_data/var
ENTRYPOINT python /app/manage.py start
