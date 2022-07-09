import { getAuthData } from './auth-reducer';
import { setCategoriesAC } from './ingredients-reducer';
import { ingredientsAPI } from './../api';

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

export const initializeApp = () => async (dispatch) => {
    await dispatch(getAuthData());
    const categories = await ingredientsAPI.getCategories();
    dispatch(setCategoriesAC(Object.keys(categories).map(id => ({...categories[id], id }))));
    dispatch(initializedSuccess());
}

export default appReducer;