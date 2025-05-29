# clients/utils.py

from decimal import Decimal
from .models import BonusTransaction

def add_bonus(client, amount, description=""):
    client.bonus_balance += Decimal(amount)
    client.save()

    BonusTransaction.objects.create(
        client=client,
        type='accrual',
        amount=amount,
        description=description
    )

def subtract_bonus(client, amount, description=""):
    if client.bonus_balance >= Decimal(amount):
        client.bonus_balance -= Decimal(amount)
        client.save()

        BonusTransaction.objects.create(
            client=client,
            type='withdrawal',
            amount=amount,
            description=description
        )
        return True
    return False
