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

    async updateInfo(uid, data, norm) {
        await axios.put(`${url}/users/${uid}/info.json`, {...data});
        await axios.put(`${url}/users/${uid}/norm.json`, {...norm});
    }
}

export const ingredientsAPI = {
    async create(ingredient, uid) {
        const res = await axios.post(`${url}/users/${uid}/ingredients/.json`, ingredient);
        return res.data.name;
    },

    async update(ingredient, uid) {
        await axios.put(`${url}/users/${uid}/ingredients/${ingredient.id}/.json`, ingredient);
    },

    async remove(id, uid) {
        await axios.delete(`${url}/users/${uid}/ingredients/${id}/.json`);
    },
}