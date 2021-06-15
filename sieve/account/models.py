from django.db import models

# Create your models here.

class User(models.Model) : 
    email = models.EmailField(max_length=254, unique='True', verbose_name='사용자 이메일')
    name =  models.CharField(max_length=20, blank=True, verbose_name='사용자 이름')
    password = models.CharField(max_length=20, verbose_name='비밀 번호')
    phone_number = models.CharField(max_length=11, verbose_name='핸드폰 번호')

    def __str__(self) :
        return self.email 