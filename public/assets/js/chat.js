import { App } from './Firebase/App.js';
import { Database } from './Firebase/Database.js';
import { Auth } from './Firebase/Auth.js';
import { Chat } from './chat/Chat.js'

let app = await App.init();
let database = new Database(app);
let auth = new Auth(app);

auth.onChange((user) => {
    new Chat(user, database, auth);
}, () => {
    location.href = 'member.html';
});