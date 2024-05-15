# users/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Watchlist  

class WatchlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Watchlist
        fields = ('id', 'name', 'stocks') 


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password', 'watchlist')
        extra_kwargs = {'password': {'write_only': True},
                        'email': {'required': True},
                        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
