FROM python:3.10-slim

WORKDIR /assignment_2

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update \
    && apt-get install -y libpq-dev gcc \
    && pip install Pillow

# Install dependencies
COPY ./assignment_2/requirements.txt ./requirements.txt
RUN pip install --upgrade pip
RUN pip install -r ./requirements.txt

COPY ./assignment_2 /assignment_2/