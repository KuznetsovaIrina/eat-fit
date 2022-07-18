import { objToArray } from './../util/helpers';
import { ingredientsAPI, userAPI } from './../api';
import { auth } from './../firebase';
import { setAuthUser } from './auth-reducer';
import { setData } from './calculator-reducer';
import { setIngredientsAC, setAllIngredientsAC, setUserIngredientsAC, setCategoriesAC } from './ingredients-reducer';
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
        auth.onAuthStateChanged(async user => {
            if (!user) {
                dispatch(setAuthUser(null));
                dispatch(setData({}));
                dispatch(setDishes([]));
                dispatch(setIngredientsAC([]));
                resolve(undefined);
            }
            else {
                const u = {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                }

                const userData = await userAPI.get(u);
                dispatch(setAuthUser({ ...u, isAdmin: userData.isAdmin || false }));

                if (userData && userData.info && userData.norm) {
                    dispatch(setData({ info: userData.info, norm: userData.norm }));
                }

                if (userData && userData.ingredients) {
                    dispatch(setUserIngredientsAC(objToArray(userData.ingredients)));
                }

                resolve(userData);
            }
        })
    });
}

export const initializeApp = () => async (dispatch) => {
    await dispatch(getAuthData());
    const categories = await ingredientsAPI.getCategories();
    let allIngredients = [];

    Object.values(categories).forEach(category => {
        if (category.ingredients) {
            objToArray(category.ingredients).forEach(i => allIngredients.push(i));
        }
    });
    
    dispatch(setAllIngredientsAC(allIngredients));
    dispatch(setCategoriesAC(objToArray(categories)));
    dispatch(initializedSuccess());
}

export default appReducer;