let regEmail = document.querySelector('#register-email');
let regPassword = document.querySelector('#register-password');
let regBtn = document.querySelector('#register-btn');

regBtn.addEventListener('click', () => {
    let email = regEmail.value;
    let pwd = regPassword.value;
    doRegister(email, pwd);
})

const doRegister = (email, pwd) => {
    if (!email || !pwd) {
        alert('信箱密碼未輸入');
        return;
    }
    console.log(email, pwd);
}