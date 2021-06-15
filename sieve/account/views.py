from django.shortcuts import render
from .forms import SignupForm  

# Create your views here.
def signup(request) :
    signup_form = SignupForm()
    return render(request, 'account/signup.html', {'signup_form' : signup_form})
    
