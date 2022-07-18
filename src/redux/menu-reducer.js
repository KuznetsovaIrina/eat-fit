import { menuAPI } from '../api';
import {objToArray} from './../util/helpers';

const SET_MEALS = 'menu/SET_MEALS';
const ADD_MEAL = 'menu/ADD_MEAL';
const UPDATE_MEAL = 'menu/UPDATE_MEAL';
const REMOVE_MEAL = 'menu/REMOVE_MEAL';
const SET_CURRENT_DATE = 'menu/SET_CURRENT_DATE';
const SET_LOADING = 'menu/SET_LOADING';

const initialState = {
    meals: [],
    currentDate: null,
    loading: false,
}

const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MEALS:
            return {
                ...state,
                meals: action.payload
            }
        case ADD_MEAL:
            return {
                ...state,
                meals: [...state.meals, action.payload]
            }
        case UPDATE_MEAL:
            return {
                ...state,
                meals: state.meals.map(meal => meal.id === action.payload.id ? {...meal, ...action.payload} : meal)
            }
        case REMOVE_MEAL:
            return {
                ...state,
                meals: state.meals.filter(meal => meal.id !== action.payload)
            }
        case SET_CURRENT_DATE:
            return {
                ...state,
                currentDate: action.payload
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

export const setMealsAC = (meals) => ({type: SET_MEALS, payload: meals});
export const addMealAC = (meal) => ({type: ADD_MEAL, payload: meal});
export const updateMealAC = (meal) => ({type: UPDATE_MEAL, payload: meal});
export const removeMealAC = (id) => ({type: REMOVE_MEAL, payload: id});
export const setCurrentDateAC = (date) => ({type: SET_CURRENT_DATE, payload: date});
export const setLoading = (isLoading) => ({type: SET_LOADING, payload: isLoading});

export const addMeal = (meal) => async (dispatch, getState) => {
    const id = await menuAPI.create(meal, getState().auth.user.uid);
    dispatch(addMealAC({...meal, id}));
    return 'Прием добавлен!';
}

export const updateMeal = (meal) => async (dispatch, getState) => {
    await menuAPI.update(meal, getState().auth.user.uid);
    dispatch(updateMealAC(meal));
    return 'Прием пищи отредактирован!';
}

export const removeMeal = (id) => async (dispatch, getState) => {
    await menuAPI.remove(id, getState().auth.user.uid)
    dispatch(removeMealAC(id));
    return 'Прием пищи удален!';
}

export const setMenu = () => async (dispatch, getState) => {
    dispatch(setLoading(true));
    const res = await menuAPI.getAll(getState().auth.user.uid);

    if (res) {
        const meals = objToArray(res);
        dispatch(setMealsAC(meals));
    }

    dispatch(setLoading(false));
}

export default menuReducer;