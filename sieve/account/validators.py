from django.core.exceptions import ValidationError
import re

def validate_password(password) : 
    min_length = 8
    max_length = 20

    if len(password) < min_length :
        error_message = '비밀번호가 너무 짧습니다. 8자 이상으로 입력하세요.'
        raise ValidationError(error_message) 
    elif len(password) > max_length :
        error_message = '비밀번호가 너무 깁니다. 20자 이하로 입력하세요.'
        raise ValidationError(error_message)
    elif not re.findall('[0-9]+', password) :
        error_message = '비밀번호는 한 개 이상의 숫자가 포함되어야 합니다.'
        raise ValidationError(error_message)
    elif not re.findall('[a-z]', password) :
        error_message = '비밀번호는 한 개 이상의 소문자가 포함되어야 합니다.'
        raise ValidationError(error_message)
    elif not re.findall('[A-Z]', password) :
        error_message = '비밀번호는 한 개 이상의 대문자가 포함되어야 합니다.'
        raise ValidationError(error_message)
    elif re.findall('[-=+,#/\?:^$.@*\"※~&%ㆍ!』\\‘|\(\)\[\]\<\>`\'…》]', password) :
        error_message = '비밀번호는 특수 문자를 포함할 수 없습니다'
        raise ValidationError(error_message)

def validate_phone_number(phone_number) :
    reg = re.compile('\d{3}-\d{3,4}-\d{4}')

    if not re.match(reg, phone_number) :
        error_message = '휴대폰 번호 형식을 지켜주세요.'
        raise ValidationError(error_message)
    
def validate_name(name) :
    if len(name.replace(' ', '')) == 0 :
        error_message = '이름은 공백일 수 없습니다'
        raise ValidationError(error_message)


    
 






    