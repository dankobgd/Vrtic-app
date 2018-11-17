import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const reduxMiddleware = [thunk];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...reduxMiddleware)));

export default store;
