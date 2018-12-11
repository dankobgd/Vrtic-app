import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const jwt = localStorage.getItem('jwt');

const initialState = {
  user: {
    jwt,
    isAuthenticated: Boolean(jwt),
    authError: null,
  },
};

const middlware = [thunk];
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middlware)));

export default store;
