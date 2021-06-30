from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(ListedCompany)
admin.site.register(StocksOfInterest)
admin.site.register(StockBalance)
admin.site.register(RealtimeAccountBalance)
admin.site.register(DailyTradingInfo)