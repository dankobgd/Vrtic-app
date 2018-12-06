import api from '../utils/api';
import setAuthorizationHeader from '../utils/setAuthorizationHeader';

const SIGN_UP = 'auth/SIGN_UP';
const SIGN_OUT = 'auth/SIGN_OUT';
const SIGN_UP_AUTH_ERROR = 'auth/SIGN_UP_AUTH_ERROR';
const LOG_IN = 'auth/LOG_IN';
const EMAIL_CONFIRMATION_REQUEST = 'auth/EMAIL_CONFIRMATION_REQUEST';

const initialState = {
  isAuthenticated: false,
  jwt: '',
  authError: null,
  isAccountConfirmed: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        isAuthenticated: true,
        jwt: action.payload,
        authError: null,
      };
    case LOG_IN:
      return {
        ...state,
        isAuthenticated: true,
        jwt: action.payload,
        authError: null,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        jwt: '',
        authError: null,
      };
    case SIGN_UP_AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        jwt: '',
        authError: action.payload,
      };
    case EMAIL_CONFIRMATION_REQUEST:
      return {
        ...state,
        isAuthenticated: true,
        jwt: action.payload,
        authError: null,
        isAccountConfirmed: true,
      };
    default:
      return state;
  }
};

export const signup = token => ({
  type: SIGN_UP,
  payload: token,
});

export const signout = () => ({
  type: SIGN_OUT,
});

export const login = token => ({
  type: LOG_IN,
  payload: token,
});

export const signupAuthError = error => ({
  type: SIGN_UP_AUTH_ERROR,
  payload: error,
});

export const confirm = token => ({
  type: EMAIL_CONFIRMATION_REQUEST,
  payload: token,
});

export const signUserUpLocalAuth = formData => {
  return async dispatch => {
    try {
      const data = await api.post('auth/signup', formData);
      dispatch(signup(data.token));
      setAuthorizationHeader(data.token);
      localStorage.setItem('jwt', data.token);
    } catch (err) {
      if (err.data.details) {
        return dispatch(signupAuthError(err.data.details));
      }
      dispatch(signupAuthError(err.data));
    }
  };
};

export const logUserInLocalAuth = formData => {
  return async dispatch => {
    try {
      const data = await api.post('auth/login', formData);
      dispatch(login(data.token));
      setAuthorizationHeader(data.token);
      localStorage.setItem('jwt', data.token);
    } catch (err) {
      if (err.data.details) {
        return dispatch(signupAuthError(err.data.details));
      }
      dispatch(signupAuthError(err.data));
    }
  };
};

export const signUserUpGoogleOauth = token => {
  return async dispatch => {
    try {
      const data = await api.post('auth/oauth/google', { access_token: token });
      dispatch(signup(data.token));
      setAuthorizationHeader(data.token);
      localStorage.setItem('jwt', data.token);
    } catch (err) {
      dispatch(signupAuthError(err));
    }
  };
};

export const signUserUpFacebookOauth = token => {
  return async dispatch => {
    try {
      const data = await api.post('auth/oauth/facebook', { access_token: token });
      dispatch(signup(data.token));
      setAuthorizationHeader(data.token);
      localStorage.setItem('jwt', data.token);
    } catch (err) {
      dispatch(signupAuthError(err));
    }
  };
};

export const signUserOut = () => dispatch => {
  dispatch(signout);
  setAuthorizationHeader();
  localStorage.removeItem('jwt');
};

export const confirmEmail = token => {
  return async dispatch => {
    const data = await api.post('auth/confirmation', { token });
    dispatch(confirm(data.token));
    setAuthorizationHeader(data.token);
    localStorage.setItem('jwt', data.token);
  };
};

export const forgotPasswordRequest = ({ email }) => {
  return async dispatch => {
    await api.post('auth/forgotPassword', { email });
  };
};

export const validateResetTokenRequest = token => {
  return async dispatch => {
    await api.post('auth/resetToken', { token });
  };
};

export const resetPasswordRequest = data => {
  return async dispatch => {
    await api.post('auth/resetPassword', {
      token: data.token,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
  };
};
