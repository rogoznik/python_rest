from .base import *

DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'todo',
        'USER': 'todo',
        'PASSWORD': 'qwerty12',
        'HOST': 'db',
        'PORT': '5432'
    }
}