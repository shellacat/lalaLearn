const key = 'tabs-setting';

class Storage {
    static write(data = {}) {
        let json = JSON.stringify(data);
        localStorage.setItem(key, json)
    }

    static read() {
        let data = localStorage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
        return {};
    }
}

export { Storage }