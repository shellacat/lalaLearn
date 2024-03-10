class Reader {
    static file(file) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader()
            reader.onload = () => {
                let data = {
                    result: reader.result,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                }
                resolve(data)
            }

            reader.readAsDataURL(file)
        })
    }

    static copy(obj) {
        return JSON.parse(JSON.stringify(obj))
    }

    static loadJs(obj, src) {
        return new Promise(async (resolve, reject) => {
            if (typeof window[obj] === 'undefined') {
                let el = document.createElement('script')
                el.src = src
                el.async = false
                el.onload = resolve
                document.head.appendChild(el)
            } else {
                return resolve()
            }
        })
    }
}

export { Reader }