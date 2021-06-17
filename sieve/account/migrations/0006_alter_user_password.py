# Generated by Django 3.2.4 on 2021-06-15 12:54

import account.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0005_alter_user_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=20, validators=[account.validators.validate_password], verbose_name='비밀 번호'),
        ),
    ]