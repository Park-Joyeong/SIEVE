from django.shortcuts import render


def edit_interest(request):
    return render(request, 'autostock/interest_edit.html')
