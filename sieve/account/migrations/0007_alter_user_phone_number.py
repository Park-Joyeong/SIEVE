# Generated by Django 3.2.4 on 2021-06-15 14:29

import account.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0006_alter_user_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='phone_number',
            field=models.CharField(max_length=11, validators=[account.validators.validate_phone_number], verbose_name='핸드폰 번호'),
        ),
    ]
