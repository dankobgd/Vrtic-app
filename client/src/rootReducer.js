import { combineReducers } from 'redux';
import signupReducer from './modules/signup';

export default combineReducers({
  signup: signupReducer,
});
