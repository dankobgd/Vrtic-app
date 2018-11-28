import { combineReducers } from 'redux';
import authReducer from '../redux/auth';
import dashboardReducer from '../redux/dashboard';

export default combineReducers({
  user: authReducer,
  dashboard: dashboardReducer,
});
