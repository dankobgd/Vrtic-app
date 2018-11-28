import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignupView from './SignupView';
import * as signupActions from '../../redux/auth';

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
  signupActions
)(SignupContainer);
