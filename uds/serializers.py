from rest_framework import serializers
from .models import Company, Product, Bonus, Order, OrderItem, Transaction

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name', 'description', 'owner', 'created_at']

    def create(self, validated_data):
        request = self.context.get('request')
        return Company.objects.create(owner=request.user, **validated_data)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class BonusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bonus
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    products = OrderItemSerializer(many=True, source='orderitem_set')

    class Meta:
        model = Order
        fields = ['id', 'user', 'company', 'products', 'total_price', 'total_bonus_earned', 'created_at']

    def create(self, validated_data):
        products_data = validated_data.pop('orderitem_set')
        order = Order.objects.create(**validated_data)
        for item_data in products_data:
            OrderItem.objects.create(order=order, **item_data)
        return order


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'