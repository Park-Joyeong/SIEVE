const $email = document.querySelector("#email");
const $password = document.querySelector("#password");
const $csrfmiddlewaretoken = document.querySelector(
    "input[name=csrfmiddlewaretoken]"
);
const $emailError = document.querySelector("#email-error");
const $passwordError = document.querySelector("#password-error");
const $signin = document.querySelector("#signin-form");
const $signinBtn = document.querySelector("#signin-btn");

// const isPasswordValidated = () => {
//     const password = $password.value;
//     let regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{8,20}$/g;
//     if (regex.test(password) === false) {
//         $passwordError.classList.add("signin-error");
//         return false;
//     } else {
//         $passwordError.classList.remove("signin-error");
//         return true;
//     }
// };

const isEmailExist = async() => {
    // create formData for fetch
    let url = "./signin/checkemail?email=" + $email.value;

    // fetch
    let response = await fetch(url);
    let result = await response.json();
    console.log(result);
    if (result["can_use_this_email"]) {
        $emailError.classList.add("signin-error");
    }
};

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
    console.log(response);

    // redirect
    window.location.href = response.url;
};

$signinBtn.onclick = async(e) => {
    e.preventDefault();

    // isEmailExist();

    await executeSignIn();
};