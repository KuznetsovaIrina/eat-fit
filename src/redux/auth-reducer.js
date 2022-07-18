import firebase from 'firebase/compat/app';
import { auth } from './../firebase';

const SET_AUTH_USER = 'auth/SET_AUTH_USER';

const initialState = {
    user: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

export const setAuthUser = (user) => ({ type: SET_AUTH_USER, payload: user });

export const login = () => async (dispatch) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const res = await auth.signInWithPopup(provider);

    const { uid, displayName, email, photoURL } = res.user;
    const user = { uid, displayName, email, photoURL }

    dispatch(setAuthUser(user));
}

export const logout = () => async (dispatch) => {
    await auth.signOut();
    dispatch(setAuthUser(null));
}

export default authReducer;