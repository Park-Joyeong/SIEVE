from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ValidationError
from .models import User

# 숙경 push test
# Create your views here.
def signup(request) :
    if request.method == 'POST' :
        email = request.POST.get("email")
        password = request.POST.get("password")
        name = request.POST.get("name")
        phone_number = request.POST.get("phone_number")
        res_data = {}
        
        new_user = User(email=email, password=password, name=name, phone_number=phone_number)
        try :
            new_user.full_clean()
        except ValidationError as error :
            error_message = ''

            if 'email' in error.message_dict :
                error_message = error.message_dict['email']
            elif 'password' in error.message_dict :
                error_message = error.message_dict['password']
            elif 'name' in error.message_dict :
                error_message = error.message_dict['name']
            else :
                error_message = error.message_dict['phone_number']
            
            res_data[ 'error_message'] = error_message
            res_data['is_success'] = False
            return JsonResponse(res_data)

        new_user.save() 
        res_data['is_success'] = True

        return JsonResponse(res_data)
        

    elif request.method == 'GET' :
        return render(request, 'account/signup.html')

        
def check_mail(request) :
    if request.method == 'GET' :
        new_email = request.GET.get("email")
        
        try :
            user = User.objects.get(email = new_email) 
        except User.DoesNotExist :  
            can_use_this_email = True
            return JsonResponse({'can_use_this_email' : can_use_this_email})

        can_use_this_email = False
        return JsonResponse({'can_use_this_email' : can_use_this_email})
        
        