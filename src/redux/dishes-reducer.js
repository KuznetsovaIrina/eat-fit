import { dishesAPI } from './../api';
import { objToArray } from './../util/helpers';

const SET_DISHES = 'dishes/SET_DISHES';
const ADD_DISH = 'dishes/ADD_DISH';
const UPDATE_DISH = 'dishes/UPDATE_DISH';
const REMOVE_DISH = 'dishes/REMOVE_DISH';
const SET_LOADING = 'dishes/SET_LOADING';

const initialState = {
    dishes: [],
    loading: false,
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
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
}

export const setDishes = (dishes) => ({type: SET_DISHES, payload: dishes});
export const addDishAC = (dish) => ({type: ADD_DISH, payload: dish});
export const updateDishAC = (dish) => ({type: UPDATE_DISH, payload: dish});
export const removeDishAC = (id) => ({type: REMOVE_DISH, payload: id});
export const setLoading = (isLoading) => ({type: SET_LOADING, payload: isLoading});

export const fetchDishes = () => async (dispatch, getState) => {
    dispatch(setLoading(true));
    const dishes = await dishesAPI.getAll(getState().auth.user.uid);
    dispatch(setDishes(objToArray(dishes)));
    dispatch(setLoading(false));
}

export const addDish = (dish) => async (dispatch, getState) => {
    const id = await dishesAPI.create(dish, getState().auth.user.uid);
    dispatch(addDishAC({...dish, id}));
    return 'Блюдо добавлено!';
}

export const updateDish = (dish) => async (dispatch, getState) => {
    await dishesAPI.update(dish, getState().auth.user.uid);
    dispatch(updateDishAC(dish));
    return 'Блюдо отредактированно!';
}

export const removeDish = (id) => async (dispatch, getState) => {
    await dishesAPI.remove(id, getState().auth.user.uid);
    dispatch(removeDishAC(id));
    return 'Блюдо удалено!';
}

export default dishesReducer;