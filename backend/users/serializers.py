# users/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Watchlist, Stock
class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ['symbol', 'name', 'open', 'high', 'low', 'close', 'volume', 'last_updated']

class WatchlistSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(write_only=True)  # Allow user_id to be provided in the request

    class Meta:
        model = Watchlist
        fields = ['id', 'user_id', 'title', 'description', 'stocks', 'created_at', 'updated_at']

    def create(self, validated_data):
        user_id = validated_data.pop('user_id')
        user = User.objects.get(id=user_id)
        
        validated_data['user'] = user
        
        return super().create(validated_data)

class UserSerializer(serializers.ModelSerializer):
    watchlist = WatchlistSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password', 'watchlist')
        extra_kwargs = {'password': {'write_only': True},
                        'email': {'required': True},
                        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.save()
        return user
