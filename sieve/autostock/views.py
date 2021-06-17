from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from .models import DailyTradingInfo, ListedCompany, StocksOfInterest

def edit_interest(request):
    if request.method == 'GET' :
        # qs : Query Set
        qs_listed_company = ListedCompany.objects.all()
        
        qs_stocks_of_interest = StocksOfInterest.objects.all()
        qs_stocks_of_interest = qs_stocks_of_interest.filter(user_id=request.session['user_id'])

        render_data = {
            'listed_company' : serializers.serialize("json", qs_listed_company),
            'stocks_of_interest' : serializers.serialize("json", qs_stocks_of_interest)
        }
        return render(request, 'autostock/interest_edit.html', render_data)
