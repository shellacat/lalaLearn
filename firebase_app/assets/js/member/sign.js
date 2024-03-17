let auth = '';
let loginEmail = '';
let loginPassword = '';
let loginBtn = '';

class SignIn {
    constructor(firebaseAuth) {
        auth = firebaseAuth;
        loginEmail = document.querySelector('#login-email');
        loginPassword = document.querySelector('#login-password');
        loginBtn = document.querySelector('#login-btn');
        loginBtn.addEventListener('click', () => {
            let email = loginEmail.value;
            let pwd = loginPassword.value;
            this.doSignIn(email, pwd);
        })
    }

    doSignIn = async (email, pwd) => {
        if (!email || !pwd) {
            alert('信箱密碼未輸入');
            return;
        }

        let user = await auth.signIn(email, pwd);
        if (user) {
            alert('登入成功');
        } else {
            alert('登入失敗');
        }
    }
}

export { SignIn }