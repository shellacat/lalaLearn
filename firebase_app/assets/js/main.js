import { App } from './Firebase/App.js';
import { Database } from './Firebase/Database.js';

let config = {
    apiKey: "AIzaSyCpkSRi7xDMGXRJiLKqZaRnX0jIzOKx6eI",
    authDomain: "f2024demo.firebaseapp.com",
    databaseURL: "https://f2024demo-default-rtdb.firebaseio.com",
    projectId: "f2024demo",
    storageBucket: "f2024demo.appspot.com",
    messagingSenderId: "986314971571",
    appId: "1:986314971571:web:2d9e73154924ac8cf9d3c6"
};

let app = await App.init(config);
let database = new Database(app);

// database.write('test', 123);

database.listen('test', (data, snapshot) => {
    console.log('from listen callback.');
    console.log(data);
})