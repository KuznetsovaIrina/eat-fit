import axios from 'axios';
import firebase from 'firebase/compat/app';
const url = process.env.REACT_APP_DB_URL;

export const userAPI = {
    async create(user) {
        const res = await axios.get(`${url}/users/${user.uid}.json`);
        if (res.data === null) {
            const ref = firebase.database().ref(`users/${user.uid}`);
            ref.set(user);
        }
    }
}