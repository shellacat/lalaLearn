let auth = '';
let regEmail = '';
let regPassword = '';
let regBtn = '';

class Register {
    constructor(firebaseAuth) {
        auth = firebaseAuth;
        regEmail = document.querySelector('#register-email');
        regPassword = document.querySelector('#register-password');
        regBtn = document.querySelector('#register-btn');
        regBtn.addEventListener('click', () => {
            let email = regEmail.value;
            let pwd = regPassword.value;
            this.doRegister(email, pwd);
        })
    }

    doRegister = async (email, pwd) => {
        if (!email || !pwd) {
            alert('信箱密碼未輸入');
            return;
        }

        let user = await auth.register(email, pwd);
        // if (user) {
        //     alert('註冊成功');
        // } else {
        //     alert('註冊失敗');
        // }
        if (user) {
            await Swal.fire({
                title: '註冊成功',
                html: `登入信箱:${user.email}`,
                icon: 'success'
            })
        } else {
            alert('註冊失敗');
            Swal.fire({
                title: '註冊失敗',
                html: '請確認信箱是否已註冊',
                icon: 'error'
            })
        }

    }
}

export { Register }