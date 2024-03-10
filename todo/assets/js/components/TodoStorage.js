import { Storage } from '/assets/js/components/Storage.js';

let storage = null;

class TodoStorage {
    constructor(key) {
        storage = new Storage(key);
    }

    write(data) {
        storage.write(data);
    }

    read() {
        return storage.read([]);
    }
}

export { TodoStorage }