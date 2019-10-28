# A Complete Beginner's Guide to Django

[![Python Version](https://img.shields.io/badge/python-3.6-brightgreen.svg)](https://python.org)
[![Django Version](https://img.shields.io/badge/django-2.2-brightgreen.svg)](https://djangoproject.com)

Code samples from the Django tutorial series.

(https://dispatch-256909.appspot.com) Django Dispatch


## Table of Contents


For the complete tutorial series index [click here](https://dispatch-256909.appspot.com).


## Running the Project Locally

First, clone the repository to your local machine:



Install the requirements:

```bash
pip install -r requirements.txt
```

Setup the local configurations:

```bash
cp .env.example .env
```

Create the database:

```bash
python manage.py migrate
```

Finally, run the development server:

```bash
python manage.py runserver
```

The project will be available at **127.0.0.1:8000**.

