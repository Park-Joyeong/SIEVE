from django.urls import path
from . import views


app_name = 'autostock'

urlpatterns = [

    path('interest/edit/', views.edit_interest, name="edit_interest"),
    path('dashboard/show/', views.show_dashboard, name="show_dashboard"),
    path('dashboard/getTradingInfo/', views.selected_stock, name="selected_stock"),
    path('dashboard/stock_balance/json', views.get_stock_balance, name='stock_balance'),
    path('dashboard/account_balance/json', views.get_account_balance, name='account_balance'),

]
