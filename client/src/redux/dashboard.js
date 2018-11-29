import api from '../utils/api';

const DASHBOARD_GET_DATA = 'dashboard/DASHBOARD_GET_DATA';

const initialState = {
  secret: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_GET_DATA:
      return { ...state, secret: action.payload };
    default:
      return state;
  }
};

const getSecret = data => ({
  type: DASHBOARD_GET_DATA,
  payload: data,
});

export const getSecretResource = () => {
  return async dispatch => {
    try {
      const res = await api.get('/secret');
      dispatch(getSecret(res.msg));
    } catch (err) {}
  };
};
