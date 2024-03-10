import { Todo } from './components/Todo.js';

const app = new Todo();

/**
 * AJAX GET 發送
 */
const doGet = () => {
    let request = new XMLHttpRequest();

    request.addEventListener('load', () => {
        console.log('loaded');
        console.log(request.responseText);
    })

    request.open('GET', 'https://book.niceinfos.com/frontend/api/?action=sleep');
    request.send();
    console.log('doGet run.');
}

doGet();