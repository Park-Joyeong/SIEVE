from django.urls import path
from . import views

app_name = 'account'

urlpatterns = [
    path('signup', views.signup, name='signup'),
    path('signup/checkemail', views.check_mail, name='check_email'),
    path('signin', views.signin, name='signin')
]
