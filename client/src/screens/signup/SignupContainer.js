import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignupView from './SignupView';
import * as signupActions from '../../redux/auth';
import * as flashMessagesActions from '../../redux/flashMessage';

class SignupContainer extends Component {
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
    return <SignupView {...this.props} facebookResponse={this.facebookResponse} googleResponse={this.googleResponse} />;
  }
}

SignupContainer.propTypes = {
  signUserUpGoogleOauth: PropTypes.func.isRequired,
  signUserUpFacebookOauth: PropTypes.func.isRequired,
  authError: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
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
  ...signupActions,
  ...flashMessagesActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupContainer);
