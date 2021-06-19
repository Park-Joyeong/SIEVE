from django.contrib import admin

# Register your models here.
from .models import ListedCompany
from .models import StocksOfInterest

admin.site.register(ListedCompany)
admin.site.register(StocksOfInterest)