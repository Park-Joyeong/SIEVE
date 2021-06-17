from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ValidationError
from .models import User

# Create your views here.


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
            error_message = ''

            if 'email' in error.message_dict:
                error_message = error.message_dict['email'][0]
            elif 'password' in error.message_dict:
                error_message = error.message_dict['password'][0]
            elif 'name' in error.message_dict:
                error_message = error.message_dict['name'][0]
            else:
                error_message = error.message_dict['phone_number'][0]

            res_data['error_message'] = error_message
            res_data['is_success'] = False
            return render(request, 'account/signup.html', {'res_data': res_data})

        new_user.save()
        request.session['user_name'] = name
        res_data['is_success'] = True
        return render(request, 'account/signup.html', {'res_data': res_data})
        # 후에 종목 편집 페이지로 리다이렉트 시켜야함!

    elif request.method == 'GET':
        return render(request, 'account/signup.html')


def check_mail(request):
    if request.method == 'GET':
        print(request)
        new_email = request.GET.get("email")
        try:
            user = User.objects.get(email=new_email)
            print(user)
        except User.DoesNotExist:
            can_use_this_email = True
            return JsonResponse({'can_use_this_email': can_use_this_email})
        can_use_this_email = False
        return JsonResponse({'can_use_this_email': can_use_this_email})


def signin(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        res_data = {}
        if not (email and password):
            res_data['error'] = '이메일과 비밀번호 모두 입력해주세요.'
            return render(request, 'account/signin.html', {'res_data': res_data})
        else:
            user = User.objects.get(email=email)

            if user.password == password:
                request.session['user'] = email
                return redirect('./autostock/interest/edit')
                # 후에 종목 편집 페이지로 리다이렉트
            else:
                res_data['error'] = '이메일 또는 비밀번호가 틀립니다.'
                return render(request, 'account/signin.html', {'res_data': res_data})
    elif request.method == "GET":
        return render(request, 'account/signin.html')
