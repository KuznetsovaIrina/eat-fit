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
    },

    async get(uid) {
        const res = await axios.get(`${url}/users/${uid}.json`);
        return res.data;
    },

    async updateInfo(uid, data) {
        const ref = firebase.database().ref(`users/${uid}`);
        ref.update({...data});
    }
}