from django.urls import path
from .views import (
    CompanyListCreateView, CompanyDetailView,
    ProductListCreateView,
    BonusListView,
    OrderCreateView,
    TransactionListView,
    BonusTotalView
)

urlpatterns = [
    path('companies/', CompanyListCreateView.as_view()),
    path('companies/<int:pk>/', CompanyDetailView.as_view()),
    path('products/', ProductListCreateView.as_view()),
    path('bonuses/', BonusListView.as_view()),
    path('bonuses/total/', BonusTotalView.as_view()),
    path('orders/', OrderCreateView.as_view()),
    path('transactions/', TransactionListView.as_view()),
]