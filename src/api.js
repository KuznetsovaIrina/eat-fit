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
    async create(ingredient, uid, categoryid) {
        const res = categoryid
            ? await axios.post(`${url}/categories/${categoryid}/ingredients.json`, ingredient)
            : await axios.post(`${url}/users/${uid}/ingredients/.json`, ingredient);

        return res.data.name;
    },

    async update(ingredient, uid, categoryId) {
        const ingredientUrl = categoryId
            ? `${url}/categories/${categoryId}/ingredients/${ingredient.id}/.json`
            : `${url}/users/${uid}/ingredients/${ingredient.id}/.json`;

        await axios.put(ingredientUrl, ingredient);
    },

    async remove(id, uid, categoryId) {
        categoryId
            ? await axios.delete(`${url}/categories/${categoryId}/ingredients/${id}/.json`)
            : await axios.delete(`${url}/users/${uid}/ingredients/${id}/.json`);
    },

    async getByCategory(categoryId) {
        const res = await axios.get(`${url}/categories/${categoryId}/ingredients.json`);
        return res.data;
    },
    
    async getByUser(uid) {
        const res = await axios.get(`${url}/users/${uid}/ingredients.json`);
        return res.data;
    },

    async getCategories() {
        const res = await axios.get(`${url}/categories.json`);
        return res.data;
    },

    async createCategory(category) {
        const res = await axios.post(`${url}/categories.json`, category);
        return res.data.name;
    }
}

export const dishesAPI = {
    async create(dish, uid) {
        const res = await axios.post(`${url}/users/${uid}/dishes/.json`, dish);
        return res.data.name;
    },

    async remove(id, uid) {
        await axios.delete(`${url}/users/${uid}/dishes/${id}/.json`);
    },

    async update(dish, uid) {
        await axios.put(`${url}/users/${uid}/dishes/${dish.id}/.json`, dish);
    },
}