from django.shortcuts import render

# Create your views here.


def edit_interest(request):
    return render(request, 'autostock/interest_edit.html')
