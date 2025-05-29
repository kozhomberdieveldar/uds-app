# clients/models.py

from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    bonus_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} — {self.bonus_balance} бонусов"


class BonusTransaction(models.Model):
    TRANSACTION_TYPES = [
        ('accrual', 'Начисление'),
        ('withdrawal', 'Списание'),
    ]

    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='bonus_transactions')
    type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.get_type_display()} {self.amount} бонусов — {self.client.name}"
