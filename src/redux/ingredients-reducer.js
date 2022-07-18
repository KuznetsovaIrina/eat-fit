import { ingredientsAPI } from './../api';
import { objToArray } from './../util/helpers';
import {USER_CATEGORY_INGREDIENTS} from './../util/helpers';

const SET_INGREDIENTS = 'ingredients/SET_INGREDIENTS';
const ADD_INGREDIENT = 'ingredients/ADD_INGREDIENT';
const UPDATE_INGREDIENT = 'ingredients/UPDATE_INGREDIENT';
const REMOVE_INGREDIENT = 'ingredients/REMOVE_INGREDIENT';
const ADD_CATEGORY = 'ingredients/ADD_CATEGORY';
const SET_CATEGORIES = 'ingredients/SET_CATEGORIES';
const SET_ALL_INGREDIENTS = 'ingredients/SET_ALL_INGREDIENTS';
const SET_USER_INGREDIENTS = 'ingredients/SET_USER_INGREDIENTS';
const SET_LOADING = 'ingredients/SET_LOADING';

const initialState = {
    userIngredients: [],
    ingredients: [],
    categories: [],
    allIngredients: [],
    loading: false,
};

const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload
            }
        case SET_ALL_INGREDIENTS:
            return {
                ...state,
                allIngredients: action.payload
            }
        case SET_USER_INGREDIENTS:
            return {
                ...state,
                userIngredients: action.payload
            }
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload],
                allIngredients: [action.payload, ...state.allIngredients],
            }
        case UPDATE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.map(i => i.id === action.payload.id ? action.payload : i),
                allIngredients: state.allIngredients.map(i => i.id === action.payload.id ? action.payload : i),
                userIngredients: state.userIngredients.map(i => i.id === action.payload.id ? action.payload : i),
            }
        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter(i => i.id !== action.payload),
                allIngredients: state.allIngredients.filter(i => i.id !== action.payload),
                userIngredients: state.userIngredients.filter(i => i.id !== action.payload),
            }
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case ADD_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.payload]
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

export const setIngredientsAC = (ingredients) => ({type: SET_INGREDIENTS, payload: ingredients});
export const setAllIngredientsAC = (ingredients) => ({type: SET_ALL_INGREDIENTS, payload: ingredients});
export const setUserIngredientsAC = (ingredients) => ({type: SET_USER_INGREDIENTS, payload: ingredients});
export const addIngredientAC = (ingredient) => ({type: ADD_INGREDIENT, payload: ingredient});
export const updateIngredientAC = (ingredient) => ({type: UPDATE_INGREDIENT, payload: ingredient});
export const removeIngredientAC = (id) => ({type: REMOVE_INGREDIENT, payload: id});
export const addCategoryAC = (category) => ({type: ADD_CATEGORY, payload: category});
export const setCategoriesAC = (categories) => ({type: SET_CATEGORIES, payload: categories});
export const setLoading = (isLoading) => ({type: SET_LOADING, payload: isLoading});

export const addIngredient = (ingredient, categoryId) => async (dispatch, getState) => {
    const id = await ingredientsAPI.create(
        {
            ...ingredient,
            category: ingredient.category || USER_CATEGORY_INGREDIENTS
        },
        getState().auth.user.uid, categoryId
    );

    dispatch(addIngredientAC({...ingredient, category: ingredient.category || USER_CATEGORY_INGREDIENTS, id}));
    return 'Ингредиент добавлен!';
}

export const updateIngredient = (ingredient, oldCategoryId) => async (dispatch, getState) => {
    await ingredientsAPI.update(
        {
            ...ingredient,
            category: ingredient.category || USER_CATEGORY_INGREDIENTS
        },
        getState().auth.user.uid,
        ingredient.category === USER_CATEGORY_INGREDIENTS ? null : ingredient.category
    )

    if (oldCategoryId !== ingredient.category) {
        dispatch(removeIngredient(ingredient.id, oldCategoryId, false));
    }
    
    dispatch(updateIngredientAC({...ingredient}));
    return 'Ингредиент изменен!';
}

export const removeIngredient = (id, categoryId, isRemoval = true) => async (dispatch, getState) => {
    categoryId !== USER_CATEGORY_INGREDIENTS
        ? await ingredientsAPI.remove(id, getState().auth.user.uid, categoryId)
        : await ingredientsAPI.remove(id, getState().auth.user.uid, null);

    dispatch(removeIngredientAC(id));
    return isRemoval ? 'Ингредиент удален!' : 'Ингредиент перенесен в другую категрию!';
}

export const setIngredients = (categoryId) => async (dispatch, getState) => {
    dispatch(setLoading(true));

    const ingredients = categoryId === USER_CATEGORY_INGREDIENTS
        ? await ingredientsAPI.getByUser(getState().auth.user.uid)
        : await ingredientsAPI.getByCategory(categoryId);

    ingredients
        ? dispatch(setIngredientsAC(objToArray(ingredients)))
        : dispatch(setIngredientsAC([]));

    dispatch(setLoading(false));
}

export const addCategory = (category) => async (dispatch) => {
    const id = await ingredientsAPI.createCategory(category);
    dispatch(addCategoryAC({...category, id}));
    return 'Категория создана!';
}

export default ingredientsReducer;