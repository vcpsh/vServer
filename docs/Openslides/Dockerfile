FROM openslides/openslides
VOLUME /app/personal_data/var
RUN python /app/manage.py createsettings
ENTRYPOINT python /app/manage.py runserver 0.0.0.0:8000
