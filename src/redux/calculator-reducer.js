import { userAPI } from "../api";
import firebase from 'firebase/compat/app';
import { message } from 'antd';
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
    await userAPI.updateInfo(firebase.auth().currentUser.uid, data, norm);

    dispatch(setData({
        info: data,
        norm
    }));

    message.success('Данные изменены');
}

export default calculatorReducer;