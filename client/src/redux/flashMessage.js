const SET_FLASH_MESSAGE = 'flashMessage/SET_FLASH_MESSAGE';
const REMOVE_FLASH_MESSAGE = 'flashMessage/REMOVE_FLASH_MESSAGE';

export default (state = [], action) => {
  switch (action.type) {
    case SET_FLASH_MESSAGE:
      return [
        ...state,
        {
          id: new Date().getTime(),
          type: action.payload.type,
          text: action.payload.text,
        },
      ];
    case REMOVE_FLASH_MESSAGE:
      const index = state.findIndex(elm => elm.id === action.payload.id);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    default:
      return state;
  }
};

export const addMessage = msg => ({
  type: SET_FLASH_MESSAGE,
  payload: msg,
});

export const removeMessage = msg => ({
  type: REMOVE_FLASH_MESSAGE,
  payload: msg,
});

export const setFlashMessage = msg => {
  return dispatch => {
    dispatch(addMessage(msg));
  };
};

export const removeFlashMessage = msg => {
  return dispatch => {
    dispatch(removeMessage(msg));
  };
};
