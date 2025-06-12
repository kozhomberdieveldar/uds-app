from rest_framework import generics, permissions
from .models import Company, Product, Bonus, Order, Transaction
from .serializers import CompanySerializer, ProductSerializer, BonusSerializer, OrderSerializer, TransactionSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import models


class CompanyListCreateView(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CompanyDetailView(generics.RetrieveAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [permissions.AllowAny]


class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class BonusListView(generics.ListAPIView):
    serializer_class = BonusSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Bonus.objects.filter(user=self.request.user)


class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TransactionListView(generics.ListAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(bonus__user=self.request.user)


class BonusTotalView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        total = Bonus.objects.filter(user=request.user).aggregate(total=models.Sum('points'))['total'] or 0
        return Response({'total': total})