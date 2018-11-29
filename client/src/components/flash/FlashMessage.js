import React from 'react';
import PropTypes from 'prop-types';

function FlashMessage({ message, removeFlashMessage }) {
  return (
    <div
      style={
        message.type === 'success'
          ? { backgroundColor: 'green', color: '#fff' }
          : { backgroundColor: 'red', color: '#fff' }
      }
    >
      <button onClick={() => removeFlashMessage(message)}>
        <span>&times;</span>
      </button>
      {message.text}
    </div>
  );
}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  removeFlashMessage: PropTypes.func.isRequired,
};

export default FlashMessage;
