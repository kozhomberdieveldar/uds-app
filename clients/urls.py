from django.urls import path
from .views import (
    ClientListAPIView,
    ClientBonusView,
    BonusTransactionListView
)

urlpatterns = [
    path('', ClientListAPIView.as_view(), name='clients-list'),
    path('bonus/', ClientBonusView.as_view(), name='bonus-balance'),
    path('bonus/history/', BonusTransactionListView.as_view(), name='bonus-history'),
]
