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
            Swal.fire({
                title: '登入錯誤',
                html: '信箱密碼未輸入',
                icon: 'error'
            })
            return;
        }

        let user = await auth.signIn(email, pwd);
        if (user) {
            await Swal.fire({
                title: '登入成功',
                html: `登入信箱:${user.email}`,
                icon: 'success'
            })
        } else {
            Swal.fire({
                title: '登入失敗',
                html: '請確認信箱與密碼',
                icon: 'error'
            })
        }
    }
}

export { SignIn }