import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlashMessage from './FlashMessage';
import { connect } from 'react-redux';
import * as flashMessagesActions from '../../redux/flashMessage';
import * as authActions from '../../redux/auth';

class FlashMessagesList extends Component {
  render() {
    const { authError, flashMessages, removeFlashMessage } = this.props;

    return (
      <>
        {!authError ? (
          <div>
            {flashMessages.map(msg => (
              <FlashMessage key={msg.id} message={msg} removeFlashMessage={removeFlashMessage} />
            ))}
          </div>
        ) : null}
      </>
    );
  }
}

FlashMessagesList.propTypes = {
  authError: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  flashMessages: PropTypes.array.isRequired,
  removeFlashMessage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authError: state.user.authError,
  flashMessages: state.flashMessages,
});

const mapDispatchToProps = {
  ...flashMessagesActions,
  ...authActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashMessagesList);
