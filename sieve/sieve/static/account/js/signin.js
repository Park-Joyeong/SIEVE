const $email = document.querySelector("#email");
const $password = document.querySelector("#password");
const $csrfmiddlewaretoken = document.querySelector(
    "input[name=csrfmiddlewaretoken]"
);
const $emailError = document.querySelector("#email-error");
const $signin = document.querySelector("#signin-form");
const $signinBtn = document.querySelector("#signin-btn");

const executeSignIn = async() => {
    let url = "./signin";
    let formData = new FormData();
    formData.append("email", $email.value);
    formData.append("password", $password.value);
    formData.append("csrfmiddlewaretoken", $csrfmiddlewaretoken.value);
    let response = await fetch(url, {
        method: "POST",
        body: formData,
    });
    console.log(response);
    window.location.href = response.url;
};

$signinBtn.onclick = async(e) => {
    e.preventDefault();

    /* 유효성 검사 */
    // let url = "./signin/checkemail";
    // let data = {
    //     email: $email.value,
    // };
    // let response = await fetch(url, {
    //     method: "POST",
    //     body: JSON.stringify(data),
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // });

    // let result = await response.json();

    // // if (result["can_use_this_email"]) {
    // //     $emailError.text("가입되지 않은 이메일입니다.");
    // //     $emailError.show();
    // // }
    await executeSignIn();
};