from rest_framework import serializers
from .models import Client, BonusTransaction

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class BonusTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BonusTransaction
        fields = ['type', 'amount', 'created_at', 'description']
