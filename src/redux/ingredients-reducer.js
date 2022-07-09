import { ingredientsAPI } from './../api';
import { message } from 'antd';

const SET_INGREDIENTS = 'ingredients/SET_INGREDIENTS';
const ADD_INGREDIENT = 'ingredients/ADD_INGREDIENT';
const UPDATE_INGREDIENT = 'ingredients/UPDATE_INGREDIENT';
const REMOVE_INGREDIENT = 'ingredients/remove_ingredient';

const initialState = {
    ingredients: [],
};

const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload
            }
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        case UPDATE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.map(i => i.id === action.payload.id ? action.payload : i)
            }
        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter(i => i.id !== action.payload)
            }
        default:
            return state;
    }
}

export const setIngredientsAC = (ingredient) => ({type: SET_INGREDIENTS, payload: ingredient});
export const addIngredientAC = (ingredient) => ({type: ADD_INGREDIENT, payload: ingredient});
export const updateIngredientAC = (ingredient) => ({type: UPDATE_INGREDIENT, payload: ingredient});
export const removeIngredientAC = (id) => ({type: REMOVE_INGREDIENT, payload: id});

export const addIngredient = (ingredient) => async (dispatch, getState) => {
    const id = await ingredientsAPI.create(ingredient, getState().auth.user.uid);
    dispatch(addIngredientAC({...ingredient, id}));
    message.success('Ингредиент добавлен!');
}

export const updateIngredient = (ingredient) => async (dispatch, getState) => {
    await ingredientsAPI.update(ingredient, getState().auth.user.uid);
    dispatch(updateIngredientAC({...ingredient}));
    message.success('Ингредиент изменен!');
}

export const removeIngredient = (id) => async (dispatch, getState) => {
    await ingredientsAPI.remove(id, getState().auth.user.uid);
    dispatch(removeIngredientAC(id));
    message.success('Ингредиент удален!');
}

export default ingredientsReducer;