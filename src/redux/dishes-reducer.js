import { message } from 'antd';
import { dishesAPI } from './../api';

const SET_DISHES = 'ingredients/SET_DISHES';
const ADD_DISH = 'ingredients/ADD_DISH';
const UPDATE_DISH = 'ingredients/UPDATE_DISH';
const REMOVE_DISH = 'ingredients/REMOVE_DISH';

const initialState = {
    dishes: [],
};

const dishesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DISHES:
            return {
                ...state,
                dishes: action.payload
            }
        case ADD_DISH:
            return {
                ...state,
                dishes: [...state.dishes, action.payload]
            }
        case UPDATE_DISH:
            return {
                ...state,
                dishes: state.dishes.map(dish => dish.id === action.payload.id ? action.payload : dish)
            }
        case REMOVE_DISH:
            return {
                ...state,
                dishes: state.dishes.filter(dish => dish.id !== action.payload)
            }
        default:
            return state;
    }
}

export const setDishes = (dishes) => ({type: SET_DISHES, payload: dishes});
export const addDishAC = (dish) => ({type: ADD_DISH, payload: dish});
export const updateDishAC = (dish) => ({type: UPDATE_DISH, payload: dish});
export const removeDishAC = (id) => ({type: REMOVE_DISH, payload: id});

export const addDish = (dish) => async (dispatch, getState) => {
    const id = dishesAPI.create(dish, getState().auth.user.uid);
    dispatch(addDishAC({...dish, id}));
}

export const updateDish = (dish) => async (dispatch) => {
    console.log(dish);
}

export const removeDish = (id) => async (dispatch) => {
    console.log(id);
}

export default dishesReducer;