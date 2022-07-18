import { database } from './firebase';

const getData = async (url) => {
    const ref = database.ref(url);
    let data = {};
    
    try {
        const query = await ref.once('value');
        data = {...query.val()};
    } catch (error) {
        console.log(error);
        throw error;
    }

    return data;
}

export const userAPI = {
    getRef() {
        return `users/`;
    },

    async create(ref, user) {
        ref.limitToFirst(1).once('value', snapshot => {
            if (!snapshot.exists()) {
                ref.set(user);
            }
        });
    },

    async get(user) {
        const ref = database.ref(this.getRef() + user.uid);
        await this.create(ref, user);
        return getData(ref);
    },

    async updateInfo(uid, data, norm) {
        const ref = database.ref(this.getRef() + uid);
        await ref.update({info: data, norm: norm});
    }
}

export const ingredientsAPI = {
    getUserRef(id) {
        return `users/${id}/ingredients/`;
    },

    getCategorysRef(id) {
        return `categories/${id}/ingredients/`;
    },

    getCategoriesRef() {
        return `categories`;
    },

    async create(ingredient, uid, categoryId) {
        const ref = categoryId
            ? this.getCategorysRef(categoryId)
            : this.getUserRef(uid);

        const res = await database.ref(ref).push(ingredient);
        return res.key;
    },

    async update(ingredient, uid, categoryId) {
        const ref = categoryId
            ? this.getCategorysRef(categoryId) + ingredient.id
            : this.getUserRef(uid) + ingredient.id;

        await database.ref(ref).update(ingredient);
    },

    async remove(id, uid, categoryId) {
        const ref = categoryId
            ? this.getCategorysRef(categoryId) + id
            : this.getUserRef(uid) + id;

        await database.ref(ref).remove();
    },

    async getByCategory(categoryId) {
        const ref = database.ref(this.getCategorysRef(categoryId));
        return getData(ref);
    },
    
    async getByUser(uid) {
        const ref = database.ref(this.getUserRef(uid));
        return getData(ref);
    },

    async getCategories() {
        const ref = database.ref(this.getCategoriesRef());
        return getData(ref);
    },

    async createCategory(category) {
        const res = await database.ref(this.getCategoriesRef()).push(category);
        return res.key;
    }
}

export const dishesAPI = {
    getRef(uid) {
        return `users/${uid}/dishes/`;
    },

    async create(dish, uid) {
        const ref = this.getRef(uid);
        const res = database.ref(ref).push(dish);
        return res.key;
    },

    async remove(id, uid) {
        const ref = this.getRef(uid) + id;
        await database.ref(ref).remove();
    },

    async update(dish, uid) {
        const ref = this.getRef(uid) + dish.id;
        await database.ref(ref).update(dish);
    },

    async getAll(uid) {
        const ref = this.getRef(uid);
        return getData(ref);
    }
}

export const menuAPI = {
    getRef(uid) {
        return `users/${uid}/menu/`;
    },

    async create(meal, uid) {
        const ref = this.getRef(uid);
        const res = database.ref(ref).push(meal);
        return res.key;
    },

    async remove(id, uid) {
        const ref = this.getRef(uid) + id;
        await database.ref(ref).remove();
    },

    async update(meal, uid) {
        const ref = this.getRef(uid) + meal.id;
        await database.ref(ref).update(meal);
    },

    async getAll(uid) {
        const ref = database.ref(this.getRef(uid));
        return getData(ref);
    },
}