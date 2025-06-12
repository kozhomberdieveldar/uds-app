from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Company(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="companies")
    name = models.CharField(max_length=100, default='Default Company')
    description = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="products")
    name = models.CharField(max_length=100, default='Default Product')
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    bonus_percent = models.PositiveIntegerField(default=5)

    def __str__(self):
        return f"{self.name} ({self.company.name})"


class Bonus(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bonuses")
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="bonuses")
    points = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    class Meta:
        unique_together = ('user', 'company')

    def __str__(self):
        return f"{self.user.phone} - {self.company.name} ({self.points} pts)"


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="orders")
    products = models.ManyToManyField(Product, through='OrderItem')
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total_bonus_earned = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} by {self.user.phone}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"


class Transaction(models.Model):
    bonus = models.ForeignKey(Bonus, on_delete=models.CASCADE, related_name="transactions")
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    is_income = models.BooleanField(default=True)
    description = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{'+' if self.is_income else '-'}{self.amount} for {self.bonus.user.phone}"