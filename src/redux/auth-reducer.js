import firebase from 'firebase/compat/app';
import { auth } from './../firebase';
import { setIngredientsAC } from './ingredients-reducer';
import { setData } from './calculator-reducer';
import { userAPI } from '../api';
import { setDishes } from './dishes-reducer';

const SET_AUTH_USER = 'auth/SET_AUTH_USER';
const SET_USER_INGREDIENTS = 'auth/SET_USER_INGREDIENTS';

const initialState = {
    user: null,
    ingredients: []
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_USER_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload
            }
        default:
            return state;
    }
}

export const setAuthUser = (user) => ({ type: SET_AUTH_USER, payload: user });
export const setIngredients = (ingredients) => ({ type: SET_USER_INGREDIENTS, payload: ingredients });

export const getAuthData = () => async (dispatch) => {
    return await new Promise( (resolve, reject) => {
        firebase.auth().onIdTokenChanged(async user => {
            if (!user) {
                dispatch(setAuthUser(null));
                dispatch(setIngredientsAC([]));
                dispatch(setData({}));
                resolve(undefined);
            }
            else {
                const userData = await userAPI.get(user.uid);
                const { uid, displayName, email, photoURL } = user;
                dispatch(setAuthUser({ uid, displayName, email, photoURL, isAdmin: userData.isAdmin || false }));
    
                if (userData && userData.ingredients) {
                    const ingredients = Object.keys(userData.ingredients).map(id => ({ ...userData.ingredients[id], id }));
                    dispatch(setIngredientsAC(ingredients));
                    dispatch(setIngredients(ingredients));
                }

                if (userData && userData.dishes) {
                    dispatch(setDishes(Object.keys(userData.dishes).map(id => ({ ...userData.dishes[id], id }))))
                }
    
                userData && userData.info && userData.norm
                    && dispatch(setData({ info: userData.info, norm: userData.norm }))
                
                resolve(user.uid);
            }
        })
    })
}

export const login = () => async (dispatch) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const res = await auth.signInWithPopup(provider);
    
    const { uid, displayName, email, photoURL } = res.user;
    const user = {
        uid,
        displayName,
        email,
        photoURL
    }

    dispatch(setAuthUser(user));
    userAPI.create(user);
}

export const logout = () => async (dispatch) => {
    await auth.signOut();
    dispatch(setAuthUser(null));
}

export default authReducer;