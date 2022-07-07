import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import appReducer from "./app-reducer";
import authReducer from "./auth-reducer";
import { compose } from 'redux';

const reducers = combineReducers({
    auth: authReducer,
    app: appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( reducers, composeEnhancers(applyMiddleware(thunkMiddleware)) );

export default store;