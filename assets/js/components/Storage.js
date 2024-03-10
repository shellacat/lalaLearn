class Storage {
    constructor(key) {
        this.key = key
    }

    write(data) {
        if (typeof data == 'object') {
            data = JSON.stringify(data)
        }

        localStorage.setItem(this.key, data)
    }

    read(def = '') {
        let data = localStorage.getItem(this.key)
        if (data) {
            data = JSON.parse(data)
            return data
        }
        return def
    }
    fetch(key, def = '') {
        let data = this.read({})
        if (data[key]) {
            return data[key]
        }
        return def
    }
    set(key, value) {
        let data = this.read({})
        data[key] = value
        this.write(data)
    }
}

export { Storage }