import React, { Component } from 'react';
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

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.user.isAuthenticated,
      jwt: state.user.jwt,
    };
  }

  return connect(mapStateToProps)(AuthGuard);
}
