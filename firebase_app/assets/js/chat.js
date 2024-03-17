let database = '';
let messageWrap = '';
let sendText = '';
let sendBtn = '';

class Chat {
    constructor(user, realtimeDabase) {
        database = realtimeDabase;
        console.log(user.uid);
        this.initDom(user);
        this.setCurrentRole(user);
        this.listen(user);
    }

    initDom(user) {
        messageWrap = document.querySelector('#message-wrap');
        sendText = document.querySelector('#send-text');
        sendBtn = document.querySelector('#send-btn');
        sendBtn.addEventListener('click', () => {
            let role = '6L7oMTnnZPY2fs7jYgy4WYj2FgE2';
            if (user.uid == '6L7oMTnnZPY2fs7jYgy4WYj2FgE2') {
                role = '0HGcBRtY3tPTiz0B9JI9XAzcwnb2';
            }
            let value = sendText.value;
            this.sendProcess(value, role);
            sendText.value = '';
            sendText.focus();
        })

        sendText.addEventListener('keyup', (e) => {
            if (e.key == 'Enter') {
                sendBtn.click();
            }
        })
    }

    setCurrentRole(user) {
        let name = document.querySelector('#role-name');
        if (name) {
            name.innerHTML = user.email;
        }
    }

    listen(user) {
        let path = `chat/${user.uid}`;
        database.listen(path, (text) => {
            this.receiverProcess(text);
        })
    }

    receiverProcess(text) {
        this.appendMessage(text, 'receiver');
    }

    sendProcess(text, role) {
        this.appendMessage(text, 'sender');
        let path = `chat/${role}`;
        database.write(path, text);
    }

    appendMessage(text, type) {
        if (!text) {
            return;
        }

        let d = new Date();
        let times = d.getHours() + ':' + d.getMinutes();

        let message = document.createElement('div');
        message.classList.add(type);
        message.innerHTML = `<span class="timestamp">${times}</span><span>${text}</span>`;

        let content = messageWrap.querySelector('.content-wrap');
        content.appendChild(message);
        content.scrollTo(0, content.scrollHeight);
    }
}

export { Chat }

// import { App } from './Firebase/App.js';
// import { Database } from './Firebase/Database.js';
// import { Auth } from './Firebase/Auth.js';

// let app = await App.init();
// let database = new Database(app);
// let auth = new Auth(app);

// auth.onChange((user) => {
//     console.log(user);
// }, () => {
//     location.href = 'member.html';
// });

// let roleChoice = document.querySelector('#role-choice');
// let currentRole = document.querySelector('#current-role');
// let messageWrap = document.querySelector('#message-wrap');
// let sendText = document.querySelector('#send-text');

// const initChat = (role) => {
//     if (!role) {
//         return;
//     }

//     listenRole(role);

//     let name = currentRole.querySelector('#role-name');
//     if (name) {
//         name.innerHTML = role;
//     }

//     roleChoice.classList.add('off');
//     currentRole.classList.add('on');
//     messageWrap.classList.add('on');

//     let sendBtn = document.querySelector('#send-btn');
//     sendBtn.addEventListener('click', () => {
//         let value = sendText.value;
//         sendProcess(value, role);
//         sendText.value = '';
//         sendText.focus();
//     })

//     sendText.addEventListener('keyup', (e) => {
//         if (e.key == 'Enter') {
//             sendBtn.click();
//         }
//     })
// }

// const sendProcess = (text, role) => {
//     appendMessage(text, 'sender');
//     let path = `chat/${role}`;
//     database.write(path, text);
// }

// const receiverProcess = (text) => {
//     appendMessage(text, 'receiver');
// }

// const appendMessage = (text, type) => {
//     if (!text) {
//         return;
//     }

//     let message = document.createElement('div');
//     message.classList.add(type);
//     message.innerHTML = `<span>${text}</span>`;

//     let content = messageWrap.querySelector('.content-wrap');
//     content.appendChild(message);
//     content.scrollTo(0, content.scrollHeight);
// }

// const listenRole = (role) => {
//     let other = 'A';
//     if (role == 'A') {
//         other = 'B';
//     }

//     let path = `chat/${other}`;

//     database.listen(path, (text) => {
//         receiverProcess(text);
//     });
// }

// roleChoice.addEventListener('click', (e) => {
//     let role = e.target.dataset.role;
//     initChat(role);
// })