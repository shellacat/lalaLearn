let database = '';
let auth = '';
let messageWrap = '';
let sendText = '';
let sendBtn = '';

class Chat {
    constructor(user, realtimeDabase, firebaseAuth) {
        database = realtimeDabase;
        auth = firebaseAuth;
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

        let signoutBtn = document.querySelector('#signout-btn');
        signoutBtn.addEventListener('click', async () => {
            await Swal.fire({
                title: '登出完成',
                html: '您已登出',
                icon: 'success'
            });
            auth.signOut();

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