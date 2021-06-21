from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ValidationError
from .models import User

def signup(request):
    if request.method == 'POST':
        email = request.POST.get("email")
        password = request.POST.get("password")
        name = request.POST.get("name")
        phone_number = request.POST.get("phone_number")
        res_data = {}

        new_user = User(email=email, password=password,
                        name=name, phone_number=phone_number)
        try:
            new_user.full_clean()

        except ValidationError as error:
            error_message = error.message_dict.values()[0]
            res_data['error_message'] = error_message
            res_data['is_success'] = False

            return JsonResponse(res_data)

        new_user.save() 
        res_data['is_success'] = True

        return JsonResponse(res_data)
        
    elif request.method == 'GET':
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
        return JsonResponse({'can_use_this_email': can_use_this_email})

def signin(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        user = User.objects.filter(email=email)[0]
        
        res_data = {}

        if  user and (user.password == password) :
            request.session.set_expiry(0) 
            # value = 0일 경우, 사용자 브라우저 꺼지면 세션 만료
            request.session['user_name'] = user.name
            request.session['user_email'] = user.email
            request.session['user_id'] = user.id

            res_data['is_success'] = True
            res_data['url_to_redirect'] = 'interest/edit' #TODO dashboard로 리다이렉트

            return JsonResponse(res_data)

        else :
            res_data['is_success'] = False
            res_data['error_message'] = '이메일과 비밀번호를 다시 확인하세요'
            return JsonResponse(res_data)
       
    elif request.method == "GET":
        if 'user_id' in request.session :
            return redirect('autostock:edit_interest') # TODO dashboard로 리다이렉트
        return render(request, 'account/signin.html')

#signout for test 120.0.0.1:8000/signout
def signout(request):
    try:
        del request.session['user_id']
        del request.session['user_email']
        del request.session['user_name']
    except:
        pass
    return redirect('account:signin')
    

