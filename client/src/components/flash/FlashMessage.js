import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

function FlashMessage({ message, removeFlashMessage }) {
  const positive = (
    <Message positive>
      {message.text}
      <button onClick={() => removeFlashMessage(message)}>
        <span>&times;</span>
      </button>
    </Message>
  );

  const negative = (
    <Message negative>
      {message.text}
      <button onClick={() => removeFlashMessage(message)}>
        <span>&times;</span>
      </button>
    </Message>
  );

  return (
    <>
      {message.type === 'success' ? positive : null}
      {message.type === 'error' ? negative : null}
    </>
  );
}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  removeFlashMessage: PropTypes.func.isRequired,
};

export default FlashMessage;
