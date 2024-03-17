let roleChoice = document.querySelector('#role-choice');
let currentRole = document.querySelector('#current-role');
let messageWrap = document.querySelector('#message-wrap');

const initChat = (role) => {
    if (!role) {
        return;
    }

    let name = currentRole.querySelector('#role-name');
    if (name) {
        name.innerHTML = role;
    }


    roleChoice.classList.add('off');
    currentRole.classList.add('on');
    messageWrap.classList.add('on');

    let sendBtn = document.querySelector('#send-btn');
    let sendText = document.querySelector('#send-text');
    sendBtn.addEventListener('click', () => {
        let value = sendText.value;
        sendProcess(value);
    })
}

const sendProcess = (text) => {
    appendMessage(text, 'sender');
    setTimeout(() => {
        receiverProcess('OK! Done.');
    }, 3000);
}

const receiverProcess = (text) => {
    appendMessage(text, 'receiver');
}

const appendMessage = (text, type) => {
    if (!text) {
        return;
    }

    let message = document.createElement('div');
    message.classList.add(type);
    message.innerHTML = `<span>${text}</span>`;

    let content = messageWrap.querySelector('.content-wrap');
    content.appendChild(message);
    content.scrollTo(0, content.scrollHeight);
}

roleChoice.addEventListener('click', (e) => {
    let role = e.target.dataset.role;
    initChat(role);
})