FROM openslides/openslides
RUN python /app/manage.py createsetting
ENTRYPOINT python /app/manage.py runserver 0.0.0.0:80
