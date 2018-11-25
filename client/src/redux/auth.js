import api from '../utils/api';

const SIGN_UP = 'signup/SIGN_UP';

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
    default:
      return state;
  }
};

export const signup = token => ({
  type: SIGN_UP,
  payload: token,
});

export const signUserUp = formData => {
  return dispatch => api.post('auth/signup', formData).then(token => dispatch(signup(token)));
};
