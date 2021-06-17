from django.db import models
from . import validators
# Create your models here.

class User(models.Model) : 
    email = models.EmailField(max_length=100, unique=True, verbose_name='이메일')
    name =  models.CharField(max_length=20, blank=True, validators=[validators.validate_name], verbose_name='이름')
    password = models.CharField(max_length=20, validators=[validators.validate_password], verbose_name='비밀 번호')
    phone_number = models.CharField(max_length=13, validators=[validators.validate_phone_number], verbose_name='핸드폰 번호')

    def __str__(self) :
        return self.email 