from dataclasses import fields
from rest_framework.serializers import ModelSerializer

from .models import User

class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'firstname',
            'lastname',
            'email'
        ]
