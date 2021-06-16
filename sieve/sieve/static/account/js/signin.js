const $email = document.querySelector("#email");
const $emailError = document.querySelector("#email-error");
const $signin = document.querySelector("#signin-form");

$signin.onsubmit = async(e) => {
    e.preventDefault();

    let url = "./signin/checkemail";
    let data = {
        email: $email.value,
    };
    let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(response);
    let result = await response.json();

    if (result["can_use_this_email"]) {
        $emailError.text("가입되지 않은 이메일입니다.");
        $emailError.show();
    }
};