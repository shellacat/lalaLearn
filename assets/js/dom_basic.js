let uid_dom = document.querySelector('#uid');
console.log(uid_dom);

uid_dom.innerHTML = 'UID update from javascript.';
uid_dom.style.color = 'blue';

let dom_students = document.querySelectorAll('.student');
console.log(dom_students);

dom_students[0].style.color = 'red';


let dom_login_account = document.querySelector('#login-account');
console.log(dom_login_account);

// dom_login_account.innerHTML = 'Hello'; // input 沒有內容
dom_login_account.value = 'Hello';

let currentValue = dom_login_account.value; // 抓取現在的值
console.log(currentValue);