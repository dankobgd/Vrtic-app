import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginView from './LoginView';
import * as LoginActions from '../../redux/auth';

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
  authError: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

const mapStateToProps = state => ({
  authError: state.user.authError,
});

export default connect(
  mapStateToProps,
  LoginActions
)(LoginContainer);
