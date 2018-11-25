import { combineReducers } from 'redux';
import authReducer from './redux/auth';

export default combineReducers({
  user: authReducer,
});
