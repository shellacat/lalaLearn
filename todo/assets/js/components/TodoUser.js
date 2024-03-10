import { Storage } from '/assets/js/components/Storage.js';

let storage = new Storage('todo-user');

class TodoUser {
    /**
     * 確認 uid 是否設定
     * @returns {boolean}
     */
    static has() {
        return this.read() ? true : false
    }

    /**
     * 取得 uid
     * @returns {string}
     */
    static read() {
        return storage.read({ uid: '' }).uid;
    }

    /**
     * 寫入 uid
     * @param {string} uid 
     */
    static write(uid) {
        storage.write({ uid: uid });
    }
}

export { TodoUser }