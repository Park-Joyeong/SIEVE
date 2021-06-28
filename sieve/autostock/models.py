from django.db import models

class DailyTradingInfo(models.Model):
    id = models.BigAutoField(primary_key=True)
    company_code = models.ForeignKey('ListedCompany', models.CASCADE, db_column='company_code', blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    open = models.BigIntegerField(blank=True, null=True)
    high = models.BigIntegerField(blank=True, null=True)
    low = models.BigIntegerField(blank=True, null=True)
    close = models.BigIntegerField(blank=True, null=True)
    diff = models.BigIntegerField(blank=True, null=True)
    volume = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'DailyTradingInfo'

class ListedCompany(models.Model):
    code = models.CharField(primary_key=True, max_length=20)
    company_name = models.CharField(max_length=40, blank=True, null=True)
    updated = models.DateField(blank=True, null=True)
    category = models.CharField(max_length=60, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ListedCompany'


class StocksOfInterest(models.Model):
    user_id = models.ForeignKey('account.User', models.CASCADE, db_column='user_id', blank=True, null=True)
    company_code = models.ForeignKey('ListedCompany', models.CASCADE, db_column='company_code', blank=True, null=True)
    created = models.DateField(blank=True, null=True)



# Create your models here.
# branch 만듦
# 주식잔고, 실시간 계좌 잔고 테이블 생성

class StockBalance(models.Model):
    id = models.BigAutoField(primary_key=True)
    user_id = models.ForeignKey('account.User', on_delete=models.CASCADE, db_column='user_id', verbose_name='유저아이디')
    company_code = models.ForeignKey('ListedCompany', on_delete=models.CASCADE, db_column='company_code', verbose_name='종목코드')
    holding_quantity = models.BigIntegerField(verbose_name='보유수량')
    purchase_unit_price = models.BigIntegerField(verbose_name='매입단가')



class RealtimeAccountBalance(models.Model):
    # id당 계좌 번호 1개
    user_id = models.ForeignKey('account.User', on_delete=models.CASCADE, db_column='user_id', verbose_name='유저아이디')
    account_number = models.CharField(max_length=30, verbose_name='계좌번호')
    total_evaluation_amount = models.BigIntegerField(verbose_name='총평가금액')
    total_valuation_profit_or_loss = models.BigIntegerField(verbose_name='총평가손익')
    rate_of_return = models.BigIntegerField(verbose_name='총손익률')