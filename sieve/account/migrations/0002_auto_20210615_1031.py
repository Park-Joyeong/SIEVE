# Generated by Django 3.2.4 on 2021-06-15 10:31

import account.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(blank=True, max_length=20, verbose_name='사용자 이름'),
        ),
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=20, validators=[account.validators.validate_password], verbose_name='비밀 번호'),
        ),
    ]