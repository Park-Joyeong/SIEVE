const $email = document.querySelector("#email");
const $password = document.querySelector("#password");
const $csrfmiddlewaretoken = document.querySelector(
    "input[name=csrfmiddlewaretoken]"
);
const $emailError = document.querySelector("#email-error");
const $passwordError = document.querySelector("#password-error");
const $signin = document.querySelector("#signin-form");
const $signinBtn = document.querySelector("#signin-btn");

const executeSignIn = async() => {
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

$signinBtn.onclick = async(e) => {
    e.preventDefault();

    // isEmailExist();

    executeSignIn().then((data) => {
        if (data["is_success"]) {
            window.location.href = data["url_to_redirect"];
        } else {
            alert(data["error_message"]);
        }
    });
};