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

const doFetch = () => {
    let api = 'https://book.niceinfos.com/frontend/api/?action=sleep';

    fetch(api)
        .then(response => {
            return response.text();
        })
        .then(data => {
            console.log(data);
        })

    console.log('doFetch run.');
}

const doFetch2 = async () => {
    let api = 'https://book.niceinfos.com/frontend/api/?action=sleep';

    let response = await fetch(api);
    let data = await response.text();

    console.log(data);
    console.log('doFetch2 run.');
}

// doFetch2();
// doGet();

const doFetchPost = async () => {
    let api = 'https://book.niceinfos.com/frontend/api/';

    let params = {
        action: 'demo',
        data: { a: 1, b: 2 },
    };

    let options = {
        method: 'POST',
        body: JSON.stringify(params)
    };

    let response = await fetch(api, options)
    let data = await response.text();
    data = JSON.parse(data);
    console.log(data);
    console.log(data.code);
}

// doFetch2();
// doGet();

doFetchPost();