from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from .models import DailyTradingInfo, ListedCompany, StocksOfInterest, StockBalance, RealtimeAccountBalance
from datetime import datetime
from . import stock_seralizers
from account.models import User


def show_dashboard(request):
    if 'user_id' not in request.session :
        return redirect('account:signin')

    if request.method == 'GET' :
        user_id = request.session['user_id']
        user = User.objects.get(id = user_id)
        qs_stock_balance = StockBalance.objects.filter(user_id = user)
        qs_account_balance = RealtimeAccountBalance.objects.get(user_id = user)

        
        res = {
            "stock_balance" : stock_seralizers.get_stock_balance(qs_stock_balance),
            "account_balance" : stock_seralizers.get_account_balance(qs_account_balance),
        }
        
        return render(request, "autostock/dashboard.html", res)

def json_interest(request):
    if 'user_id' not in request.session:  # user_id가 세션에 없으면(=로그인되지 않은 사용자면)
        return JsonResponse({"err" : "Not Logged in"}) # 오류  메시지 반환

    user_email = request.session['user_email']
    user_name = request.session['user_name']
    user_id = request.session['user_id']

    if request.method == 'GET':
        # qs : Query Set
    
        qs_stocks_of_interest = StocksOfInterest.objects.select_related("company_code").all()
        qs_stocks_of_interest = qs_stocks_of_interest.filter(user_id=user_id)
        res = []
        for a in qs_stocks_of_interest:
            res.append({
                "company_code" : a.company_code.code,
                "company_name" : a.company_code.company_name,
                "category" : a.company_code.category,
                "created" : a.created
            })
        return JsonResponse({"data" : res}, json_dumps_params={"ensure_ascii":False})


def edit_interest(request):
    if 'user_id' not in request.session:  # user_id가 세션에 없으면(=로그인되지 않은 사용자면)
        return redirect('/signin')

    user_email = request.session['user_email']
    user_name = request.session['user_name']
    user_id = request.session['user_id']
    

    if request.method == 'GET':
        # qs : Query Set
        qs_listed_company = ListedCompany.objects.all()

        qs_stocks_of_interest = StocksOfInterest.objects.all()
        qs_stocks_of_interest = qs_stocks_of_interest.filter(
            user_id=user_id)

        render_data = {
            'listed_company': serializers.serialize("json", qs_listed_company),
            'stocks_of_interest': serializers.serialize("json", qs_stocks_of_interest)
        }
        return render(request, 'autostock/interest_edit.html', render_data)

    elif request.method == "POST":
        # 선택한 관심종목들을 리스트로 전달받음
        selected_company_str = request.POST['selected']
        if selected_company_str == '':
            selected_company_list = []
        else:
            selected_company_list = selected_company_str.split(',')

        # 현재 사용자의 관심종목이었지만, 이번에는 선택되지 않은 회사들을 삭제
        qs_stocks_of_interest = StocksOfInterest.objects.all()
        qs_stocks_of_interest = qs_stocks_of_interest.filter(user_id=user_id)
        
        for selected_company in selected_company_list:
            qs_stocks_of_interest = qs_stocks_of_interest.exclude(
                company_code=selected_company)

        qs_stocks_of_interest.delete()
        # 현재 사용자의 관심종목(b,c)이었고, 이번에도 선택된 회사(b,c,d)의 교집합은 아무 처리도 하지 않음
        # (추가일자는 최초에 관심종목으로 지정한 날짜 기준)
        # 이번 선택 리스트에 있지만, 이전에는 없었던 회사들을 관심종목으로 DB에 추가
        # (추가일자는 현재 시점의 일자 사용)

        # DB에 있는 데이터 불러오기
        qs_stocks_of_interest = StocksOfInterest.objects.all()
        qs_stocks_of_interest = qs_stocks_of_interest.filter(user_id=user_id)

        for selected_company in selected_company_list:

            # 없는 데이터는 DB에 추가
            if StocksOfInterest.objects.filter(user_id=user_id, company_code=selected_company).count() == 0:
                user = User.objects.get(id=user_id)    
                listedCompany = ListedCompany.objects.get(code=selected_company)
                current_date = datetime.now().strftime('%Y-%m-%d')
                row = StocksOfInterest(
                    user_id=user, company_code=listedCompany, created=current_date)
                row.save()

        res_data = {}
        res_data['is_success'] = True
        return JsonResponse(res_data)

def selected_stock(request):
    if request.method == 'GET':
        company_code = request.GET['companyCode']

        daily_trading_info = DailyTradingInfo.objects.all()
        tradingInfo = daily_trading_info.filter(company_code = company_code)

        return JsonResponse({'tradingInfo':serializers.serialize("json",tradingInfo)})

