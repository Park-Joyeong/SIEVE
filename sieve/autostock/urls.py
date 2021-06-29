from django.urls import path
from . import views


app_name = 'autostock'

urlpatterns = [

    path('interest/edit/', views.edit_interest, name="edit_interest"),
    path('dashboard/show/', views.show_dashboard, name="show_dashboard"),
    path('dashboard/show/', views.selected_stock, name="selected_stock")
]
