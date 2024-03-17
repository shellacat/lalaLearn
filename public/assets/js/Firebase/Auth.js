import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'

let auth = {};

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

    async signIn(email, password) {
        try {
            let response = await signInWithEmailAndPassword(auth, email, password);
            return response.user;
        } catch (e) {
            console.log(e.message);
            return false;
        }
    }

    async signOut() {
        try {
            await signOut(auth);
            return true;
        } catch (e) {
            console.log(e.message);
            return false;
        }
    }

    onChange(authed, unauthed) {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (typeof authed == 'function') {
                    authed(user);
                }
            } else {
                if (typeof unauthed == 'function') {
                    unauthed(user);
                }
            }
        })
    }
}

export { Auth }