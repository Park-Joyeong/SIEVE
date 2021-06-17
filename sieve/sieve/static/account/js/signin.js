const $email = document.querySelector("#email");
const $password = document.querySelector("#password");
const $csrfmiddlewaretoken = document.querySelector(
    "input[name=csrfmiddlewaretoken]"
);
const $emailError = document.querySelector("#email-error");
const $passwordError = document.querySelector("#password-error");
const $signinInput = document.querySelector(".signin-input");
const $signin = document.querySelector("#signin-form");
const $signinBtn = document.querySelector("#signin-btn");

const isEmail = (email) => {
    const email_regex =
        /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (!email_regex.test(email)) {
        return false;
    } else {
        return true;
    }
};

const executeSignIn = async() => {
    // isEmail
    if (!$email.value) {
        $emailError.innerText = "이메일을 입력하세요.";
        $emailError.classList.remove("d-none");
        $email.focus();
        return;
    } else if (!isEmail($email.value)) {
        $emailError.innerText = "이메일 형식이 아닙니다.";
        $emailError.classList.remove("d-none");
        $email.focus();
        return;
    }

    // check password
    if (!$password.value) {
        $passwordError.innerText = "비밀번호를 입력하세요.";
        $passwordError.classList.remove("d-none");
        $password.focus();
        return;
    }

    // create formData for fetch
    let url = "./signin";
    let formData = new FormData();
    formData.append("email", $email.value);
    formData.append("password", $password.value);
    formData.append("csrfmiddlewaretoken", $csrfmiddlewaretoken.value);

    // response.url is 'redirect' link
    let response = await fetch(url, {
        method: "POST",
        body: formData,
    });

    const result = await response.json();

    return result;
};

$email.onkeyup = (e) => {
    // animate 예정
    $emailError.classList.add("d-none");
};

$password.onkeyup = (e) => {
    // animate 예정
    $passwordError.classList.add("d-none");
};

$signinBtn.onclick = async(e) => {
    e.preventDefault();

    const data = await executeSignIn();
    if (data["is_success"]) {
        window.location.href = data["url_to_redirect"];
    } else {
        alert(data["error_message"]);
    }
};