import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginView from './LoginView';
import * as LoginActions from '../../redux/auth';
import * as flashMessagesActions from '../../redux/flashMessage';

class LoginContainer extends Component {
  googleResponse = async res => {
    await this.props.signUserUpGoogleOauth(res.accessToken);
    if (!this.props.authError) {
      this.props.history.push('/dashboard');
    }
  };

  facebookResponse = async res => {
    await this.props.signUserUpFacebookOauth(res.accessToken);
    if (!this.props.authError) {
      this.props.history.push('/dashboard');
    }
  };

  render() {
    return <LoginView {...this.props} facebookResponse={this.facebookResponse} googleResponse={this.googleResponse} />;
  }
}

LoginContainer.propTypes = {
  signUserUpGoogleOauth: PropTypes.func.isRequired,
  signUserUpFacebookOauth: PropTypes.func.isRequired,
  authError: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  setFlashMessage: PropTypes.func.isRequired,
  removeFlashMessage: PropTypes.func.isRequired,
  flashMessages: PropTypes.array,
};

const mapStateToProps = state => ({
  authError: state.user.authError,
  flashMessages: state.flashMessages,
});

const mapDispatchToProps = {
  ...LoginActions,
  ...flashMessagesActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
