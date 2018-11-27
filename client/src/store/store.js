import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const reduxMiddleware = [thunk];

const jwt = localStorage.getItem('jwt');

const initialState = {
  user: {
    jwt: jwt,
    isAuthenticated: jwt ? true : false,
    authError: null,
  },
};

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...reduxMiddleware)));

export default store;
