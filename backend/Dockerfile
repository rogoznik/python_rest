FROM python:3.9.10

RUN apt-get update \
    && apt-get install -y postgresql postgresql-contrib libpq-dev python3-dev
RUN pip install --upgrade pip
COPY ./ ./
RUN pip install -r requirements.txt
RUN pip install gunicorn
RUN chmod +x wait-for-postgres.sh