import { userAPI } from "../api";
import firebase from 'firebase/compat/app';
const SET_DATA = 'calculator/SET_DATA';

const initialState = {
    data: {}
};

const calculatorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}

export const setData = (data) => ({ type: SET_DATA, payload: data });

export const updateUserInfo = (data, norm) => async (dispatch) => {
    userAPI.updateInfo(firebase.auth().currentUser.uid, {
        info: data,
        norm
    });

    dispatch(setData({
        info: data,
        norm
    }));
}

export default calculatorReducer;