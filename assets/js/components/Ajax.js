import { Token } from './Token.js'

let token = await Token.get()

class Ajax {
    constructor() {
        this.files = {}
        this.type = 'json'
    }

    initParams(form, field, data) {
        if (typeof data == 'object') {
            for (let f in data) {
                let nf = `${field}[${f}]`
                let ndata = data[f]
                if (typeof ndata == 'object') {
                    form = this.initParams(form, nf, ndata)
                } else {
                    form.append(nf, ndata)
                }
            }
        } else {
            form.append(field, data)
        }
        return form
    }

    doPost(url, params) {
        let form = new FormData()
        form.append('_token', token)

        for (let f in params) {
            form = this.initParams(form, f, params[f])
        }

        if (Object.keys(this.files).length > 0) {
            for (let n in this.files) {
                form.append(n, this.files[n])
            }
        }

        let request = fetch(url, {
            method: 'POST',
            body: form,
        })

        return this.doSend(request)
    }

    doGet(url, params) {
        let data = []
        let form = new FormData()

        for (let f in params) {
            form = this.initParams(form, f, params[f])
        }

        form.forEach((v, k) => {
            let str = `${k}=${v}`
            data.push(encodeURI(str))
        })

        url += '?' + data.join('&')

        let request = fetch(url, {
            method: 'GET',
        })

        return this.doSend(request)
    }

    doSend(request) {
        return new Promise((resolve, reject) => {
            let status = 200
            request
                .then((response) => {
                    status = response.status
                    return response.text()
                })
                .then((response) => {
                    if (this.type == 'json') {
                        if (new RegExp('^{.*}$', 'mg').test(response)) {
                            response = JSON.parse(response)
                        } else {
                            response = {
                                data: response,
                                code: status,
                            }
                        }
                    }
                    resolve(response)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

    toJson() {
        this.type = 'json'
        return this
    }

    toText() {
        this.type = 'text'
        return this
    }

    appendFile(name, file) {
        this.files[name] = file
        return this
    }

    resetFile() {
        this.files = {}
        return this
    }
}

export { Ajax }