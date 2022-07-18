import { userAPI } from "../api";
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

export const updateUserInfo = (data, norm) => async (dispatch, getState) => {
    await userAPI.updateInfo(getState().auth.user.uid, data, norm);

    dispatch(setData({
        info: data,
        norm
    }));

    return 'Данные изменены';
}

export default calculatorReducer;