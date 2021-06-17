from django.db import models

class DailyTradingInfo(models.Model):
    id = models.BigAutoField(primary_key=True)
    company_code = models.ForeignKey('ListedCompany', models.DO_NOTHING, db_column='company_code', blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    open = models.BigIntegerField(blank=True, null=True)
    high = models.BigIntegerField(blank=True, null=True)
    low = models.BigIntegerField(blank=True, null=True)
    close = models.BigIntegerField(blank=True, null=True)
    diff = models.BigIntegerField(blank=True, null=True)
    volume = models.BigIntegerField(blank=True, null=True)


class ListedCompany(models.Model):
    code = models.CharField(primary_key=True, max_length=20)
    company_name = models.CharField(max_length=40, blank=True, null=True)
    updated = models.DateField(blank=True, null=True)
    category = models.CharField(max_length=60, blank=True, null=True)


class StocksOfInterest(models.Model):
    user_id = models.ForeignKey('account.User', models.DO_NOTHING, db_column='user_id', blank=True, null=True)
    company_code = models.ForeignKey('ListedCompany', models.DO_NOTHING, db_column='company_code', blank=True, null=True)
    created = models.DateField(blank=True, null=True)



# Create your models here.
