import { objToArray } from './../util/helpers';
import { ingredientsAPI, userAPI } from './../api';
import firebase from 'firebase/compat/app';
import { setAuthUser } from './auth-reducer';
import { setData } from './calculator-reducer';
import { setIngredientsAC, setAllIngredientsAC, setCategoriesAC } from './ingredients-reducer';
import { setDishes } from './dishes-reducer';

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';

const initialState = {
    initialized: false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const getAuthData = () => async (dispatch) => {
    return new Promise(resolve => {
        firebase.auth().onIdTokenChanged(async user => {
            if (!user) {
                dispatch(setAuthUser(null));
                dispatch(setDishes([]));
                dispatch(setIngredientsAC([]));
                dispatch(setData({}));
                resolve(undefined);
            }
            else {
                const userData = await userAPI.get(user.uid);
        
                dispatch(setAuthUser({
                    uid: userData.uid,
                    displayName: userData.displayName,
                    email: userData.email,
                    photoURL: userData.photoURL,
                    isAdmin: userData.isAdmin || false 
                }));
            
                if (userData && userData.dishes) {
                    dispatch(setDishes(objToArray(userData.dishes)));
                }
            
                if (userData && userData.info && userData.norm) {
                    dispatch(setData({ info: userData.info, norm: userData.norm }));
                }

                resolve(userData);
            }
        })
    });
}

export const initializeApp = () => async (dispatch) => {
    const userData = await dispatch(getAuthData());
    const categories = await ingredientsAPI.getCategories();
    const userIngredients = userData && userData.ingredients ? objToArray(userData.ingredients) : [];
    let allIngredients = [];

    if (categories) {
        Object.values(categories).forEach(category => {
            objToArray(category.ingredients)
                .forEach(i => allIngredients.push(i))
        })
    }

    dispatch(setAllIngredientsAC([...userIngredients, ...allIngredients]));
    dispatch(setCategoriesAC(objToArray(categories)));
    dispatch(initializedSuccess());
}

export default appReducer;