function isEmailValidated() {
  return $("#email").get(0).checkValidity();
}

function isNameValidated() {
  const name = $("#name").val().trim();
  nameMask();
  if (name.length == 0 || name.length > 20) {
    $("#name-error").show();
    return false;
  }
  $("#name-error").hide();
  return true;
}

function isPasswordValidated() {
  const password = $("#password").val();
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{8,20}$/g;
  if (password.match(regex) !== null) {
    $("#password-error").hide();
    return true;
  } else {
    $("#password-error").show();
    return false;
  }
}

function isPhoneNumberValidated() {
  phoneMask();
  if ($("#phone-number").val().length == 13) {
    return true;
  }
  return false;
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

function nameMask() {
  const name = $("#name")
    .val()
    .replace(/[^ㄱ-힣a-zA-Z ]/g, "");
  $("#name").val(name);
}

function phoneMask() {
  let num = $("#phone-number").val().replace(/\D/g, "");
  if (num.length >= 4 && num.length < 8) {
    num = num.substring(0, 3) + "-" + num.substring(3);
  } else if (num.length >= 8) {
    num =
      num.substring(0, 3) +
      "-" +
      num.substring(3, 7) +
      "-" +
      num.substring(7, 11);
  }
  $("#phone-number").val(num);
}

function formValid(e) {
  e.preventDefault();

  if (!isEmailValidated()) {
    alert("이메일을 확인해주세요.");
    return;
  }
  if (!isNameValidated()) {
    alert("이름을 확인해주세요.");
    return;
  }
  if (!isPasswordValidated()) {
    alert("비밀번호를 확인해주세요.");
    return;
  }
  if (!isPhoneNumberValidated()) {
    alert("휴대폰 번호를 확인해주세요.");
    return;
  }

  executeSignUp();
}

function executeSignUp() {
  const dataForm = new FormData($("#formSignUp").get(0));
  fetch("./signup", {
    method: "post",
    body: dataForm,
  })
    .then((response) => response.json())
    .then((data) => {
      if(data["is_success"]) {
        alert('회원가입이 완료되었습니다.');
        window.location.href = "./signin";
      } else {
        alert(data["error_message"]);
      }
    });
}
