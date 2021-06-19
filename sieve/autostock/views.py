from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from .models import DailyTradingInfo, ListedCompany, StocksOfInterest
from account.models import User
from datetime import datetime


def edit_interest(request):
    user_id = ''
    user_email = ''
    user_name = ''

    if 'user_name' not in request.session:  # user_id가 세션에 없으면(=로그인되지 않은 사용자면)
        return redirect('/signin')
    user_email = request.session['user_email']
    user_name = request.session['user_name']
    user = User.objects.get(email=user_email)

    if request.method == 'GET':
        # qs : Query Set
        qs_listed_company = ListedCompany.objects.all()

        qs_stocks_of_interest = StocksOfInterest.objects.all()
        qs_stocks_of_interest = qs_stocks_of_interest.filter(
            user_id=user.id)

        render_data = {
            'listed_company': serializers.serialize("json", qs_listed_company),
            'stocks_of_interest': serializers.serialize("json", qs_stocks_of_interest)
        }
        return render(request, 'autostock/interest_edit.html', render_data)

    elif request.method == "POST":
        # 선택한 관심종목들을 리스트로 전달받음
        selected_company_str = request.POST['selected']
        selected_company_list = selected_company_str.split(',')
    
        # 현재 사용자의 관심종목이었지만, 이번에는 선택되지 않은 회사들을 삭제
        qs_stocks_of_interest = StocksOfInterest.objects.all()
        qs_stocks_of_interest = qs_stocks_of_interest.filter(user_id=user.id)
        qs_stocks_of_interest_delete = None
        for selected_company in selected_company_list:
            qs_stocks_of_interest_delete = qs_stocks_of_interest.exclude(
                company_code=selected_company)
        qs_stocks_of_interest_delete.delete()
        
        # 현재 사용자의 관심종목(b,c)이었고, 이번에도 선택된 회사(b,c,d)들은 아무 처리도 하지 않음
        # (추가일자는 최초에 관심종목으로 지정한 날짜 기준)
        # 이번 선택 리스트에 있지만, 이전에는 없었던 회사들을 관심종목으로 DB에 추가
        # (추가일자는 현재 시점의 일자 사용)

        # DB에 있는 데이터 불러오기
        qs_stocks_of_interest = StocksOfInterest.objects.all()
        qs_stocks_of_interest = qs_stocks_of_interest.filter(user_id=user.id)

        # 내 선택 리스트 불러오기 
        #selected_company_list
        

        # 바깥 for문 (기존선택배열) 내부 for문(새로운선택배열) 
        # 하고 싶은것: 기존배열에 없으면 추가!
        
        for selected_company in selected_company_list:
            is_null = True
            for entity in qs_stocks_of_interest.iterator():
                if str(entity.company_code.code) == selected_company:
                    is_null = False
            if is_null:
                listedCompany = ListedCompany.objects.get(code=selected_company)
                current_date = datetime.now().strftime('%Y-%m-%d')
                row = StocksOfInterest(
                    user_id=user, company_code=listedCompany, created=current_date)
                row.save()
                    

            

        return redirect('autostock/dashboard')  # 저장 후에는 dashboard로 이동
