import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function(Original) {
  class AuthGuard extends Component {
    chechAuthenticated() {
      if (!this.props.isAuthenticated && !this.props.jwt) {
        this.props.history.push('/login');
      }
    }

    componentDidMount = () => {
      this.chechAuthenticated();
    };

    componentDidUpdate = (prevProps, prevState) => {
      this.chechAuthenticated();
    };

    render() {
      return <Original {...this.props} />;
    }
  }

  AuthGuard.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    jwt: PropTypes.string,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
    jwt: state.user.jwt,
  });

  return connect(mapStateToProps)(AuthGuard);
}
