import { getDatabase, set, ref, onValue, get, push, update } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js'

let db = {};

const getPath = (path) => {
    return ref(db, path);
};

class Database {
    constructor(app) {
        db = getDatabase(app);
    }

    async write(path, data = {}) {
        let to = getPath(path);
        try {
            await set(to, data)
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    listen(path, callback, cache = false) {
        let to = getPath(path);
        onValue(to, (snapshot) => {
            const data = snapshot.val();
            if (typeof callback == 'function') {
                callback(data, snapshot);
            }
        },
            {
                onlyOnce: cache
            });
    }
}

export { Database }