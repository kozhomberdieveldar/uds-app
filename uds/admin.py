from django.contrib import admin
from .models import Company, Product, Bonus, Order, OrderItem, Transaction

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'owner', 'created_at')
    search_fields = ('name', 'owner__phone')
    list_filter = ('created_at',)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'company', 'price', 'bonus_percent')
    search_fields = ('name', 'company__name')
    list_filter = ('company',)


@admin.register(Bonus)
class BonusAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'company', 'points')
    search_fields = ('user__phone', 'company__name')
    list_filter = ('company',)


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'company', 'total_price', 'total_bonus_earned', 'created_at')
    search_fields = ('user__phone', 'company__name')
    list_filter = ('created_at',)
    inlines = [OrderItemInline]


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'bonus', 'amount', 'is_income', 'created_at')
    list_filter = ('is_income', 'created_at')
    search_fields = ('bonus__user__phone', 'bonus__company__name')