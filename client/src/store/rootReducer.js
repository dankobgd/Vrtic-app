import { combineReducers } from 'redux';
import authReducer from '../redux/auth';
import dashboardReducer from '../redux/dashboard';
import flashMessageReducer from '../redux/flashMessage';

export default combineReducers({
  user: authReducer,
  dashboard: dashboardReducer,
  flashMessages: flashMessageReducer,
});
