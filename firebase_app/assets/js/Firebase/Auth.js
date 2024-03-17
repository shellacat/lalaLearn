import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'

const auth = {};

class Auth {
    constructor(app) {
        auth = getAuth(app);
    }

    async register(email, password) {
        try {
            let response = await createUserWithEmailAndPassword(auth, email, password);
            return response.user
        } catch (e) {
            console.log(e.message);
            return false;
        }
    }
}

export { Auth }