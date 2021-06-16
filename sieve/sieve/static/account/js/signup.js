function isEmailValidated() {
  return $("#email").get(0).checkValidity();
}

function isNameValidated() {
}

function isPasswordValidated() {
}

function isPhoneNumberValidated() {
}

function emailFocusOut() {
  if (!isEmailValidated()) {
    $("#email-error").text("※올바른 이메일형식이 아닙니다.");
    $("#email-error").show();
  } else {
    $("#email-error").hide();

    fetch("./signup/checkemail?" + "email=" + $("#email").val())
      .then((response) => response.json())
      .then((data) => {
        if (data["can_use_this_email"]) {
        } else {
          $("#email-error").text("이미 가입 된 회원입니다.");
          $("#email-error").show();
        }
      });
  }
} //end of emailFocusOut()

function nameOnInput() {
  $("#name-error").hide();
  var name = $("#name").val();
  if (name.length === 0 || name.length > 10) {
    $("#name-error").show();
    return;
  }
}

function phoneMask() {
  var num = $(this).val().replace(/\D/g, "");

  if (num.length < 3) {
    return;
  } else if (num.length >= 3 && num.length < 7) {
    $(this).val(num.substring(0, 3) + "-" + num.substring(3, 7));
    return;
  } else {
    $(this).val(
      num.substring(0, 3) +
        "-" +
        num.substring(3, 7) +
        "-" +
        num.substring(7, 11)
    );
    return;
  }
}

function formValid(e) {
  e.preventDefault();
  if(!isEmailValidated()){
    alert('이메일을 확인해주세요.');
  }
  
  isNameValidated()
  
  isPasswordValidated()
  
  isPhoneNumberValidated()

  executeSignUp();
}

function executeSignUp() {
  let dataForm = new FormData($("#formSignUp").get(0));
  fetch("{% url 'account:signup' %}", {
    method: "post",
    body: dataForm,
  }).then((result) => {
    //TODO
    console.log(result);
  });
}

$(document).ready(function () {
  $('[type="tel"]').keyup(phoneMask);
  if ("{{res_data.is_success}}" == "True") {
    alert("회원가입이 완료 되었습니다.");
  }
}); //end of ready()
