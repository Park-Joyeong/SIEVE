from django.urls import path
from . import views

# app_name: autostock

urlpatterns = [
    path('interest/edit', views.edit_interest, name = 'Edit interested stocks'),
]
