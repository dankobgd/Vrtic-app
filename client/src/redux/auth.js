import api from '../utils/api';

const SIGN_UP = 'signup/SIGN_UP';
const SIGN_UP_AUTH_ERROR = 'signup/SIGN_UP_AUTH_ERROR';

const initialState = {
  isAuthenticated: false,
  jwt: '',
  authError: '',
  formErrors: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SIGN_UP:
      return { ...state, isAuthenticated: true, jwt: action.payload, authError: '', formErrors: [] };
    case SIGN_UP_AUTH_ERROR:
      return { ...state, isAuthenticated: false, jwt: '', authError: action.payload, formErrors: [] };
    default:
      return state;
  }
};

export const signup = token => ({
  type: SIGN_UP,
  payload: token,
});

export const signupAuthError = error => ({
  type: SIGN_UP_AUTH_ERROR,
  payload: error,
});

export const signUserUp = formData => {
  return dispatch =>
    api.post('auth/signup', formData).then(data => {
      if (data.token) {
        dispatch(signup(data.token));
        localStorage.setItem('jwt', data.token);
      } else if (data.error) {
        dispatch(signupAuthError(data.error));
      }
    });
};
