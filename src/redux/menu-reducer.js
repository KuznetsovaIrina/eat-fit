import { message } from 'antd';
import { menuAPI } from '../api';
import {objToArray} from './../util/helpers';

const SET_MEALS = 'menu/SET_MEALS';
const ADD_MEAL = 'menu/ADD_MEAL';
const UPDATE_MEAL = 'menu/UPDATE_MEAL';
const REMOVE_MEAL = 'menu/REMOVE_MEAL';

const initialState = {
    meals: [],
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
        default:
            return state;
    }
}

export const setMealsAC = (meals) => ({type: SET_MEALS, payload: meals});
export const addMealAC = (meal) => ({type: ADD_MEAL, payload: meal});
export const updateMealAC = (meal) => ({type: UPDATE_MEAL, payload: meal});
export const removeMealAC = (id) => ({type: REMOVE_MEAL, payload: id});

export const addMeal = (meal) => async (dispatch, getState) => {
    const id = await menuAPI.create(meal, getState().auth.user.uid);
    dispatch(addMealAC({...meal, id}));
    message.success('Прием добавлен!');
}

export const updateMeal = (meal) => async (dispatch, getState) => {
    await menuAPI.update(meal, getState().auth.user.uid);
    dispatch(updateMealAC(meal));
    message.success('Прием пищи отредактирован!');
}

export const removeMeal = (id) => async (dispatch, getState) => {
    await menuAPI.remove(id, getState().auth.user.uid)
    dispatch(removeMealAC(id));
    message.success('Прием пищи удален!');
}

export const setMenu = (date) => async (dispatch, getState) => {
    const res = await menuAPI.getAll(getState().auth.user.uid);

    if (res) {
        const meals = objToArray(res);
        const todayMeals = meals.filter(t => t.date === date);
        dispatch(setMealsAC(todayMeals));
    } else {
        dispatch(setMealsAC([]));
    }
    // Берем из базы все приемы пищи, фильтруем и устанавливаем только те которые на текущую дату.

    // Или же. берем из базы все приемы пищи, устанавливаем.
    // Делаем в стейте текущую дату и отдаем все приемы пищи, а через селекторы уже фильтруем только на текущую дату.
    
}

export default menuReducer;