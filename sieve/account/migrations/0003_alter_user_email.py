# Generated by Django 3.2.4 on 2021-06-15 11:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_auto_20210615_1031'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, unique=True, verbose_name='사용자 이메일'),
        ),
    ]
