import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as dashboardActions from '../redux/dashboard';

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getSecretResource();
  };

  render() {
    return (
      <div style={{ color: 'darkred' }}>
        <h2>{this.props.secret.msg}</h2>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    secret: state.dashboard.secret,
  };
}

export default connect(
  mapStateToProps,
  dashboardActions
)(Dashboard);
