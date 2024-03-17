import { App } from './Firebase/App.js';
import { Auth } from './Firebase/Auth.js';
import { Register } from './member/Register.js';
import { SignIn } from './member/SignIn.js';

let app = await App.init();
let auth = new Auth(app);

new SignIn(auth);
new Register(auth);

let registerWrap = document.querySelector('#register-wrap');
let loginWrap = document.querySelector('#login-wrap');
let toLoginBtn = document.querySelector('#to-login-btn');
let toRegisterBtn = document.querySelector('#to-register-btn');


toLoginBtn.addEventListener('click', () => {
    loginWrap.classList.add('on');
    registerWrap.classList.remove('on');
})

toRegisterBtn.addEventListener('click', () => {
    loginWrap.classList.remove('on');
    registerWrap.classList.add('on');
})

auth.onChange((user) => {
    location.href = 'chat.html';
}, () => {
    loginWrap.classList.add('on');
})


