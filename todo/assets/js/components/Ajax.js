class Ajax {
    static async get(api) {
        let response = await fetch(api);
        let text = await response.text();
        if (text) {
            text = JSON.parse(text);
        }
        return text;
    }
}

export { Ajax }