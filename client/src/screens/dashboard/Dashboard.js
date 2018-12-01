import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as dashboardActions from '../../redux/dashboard';
import * as authActions from '../../redux/auth';

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getSecretResource();
  };

  render() {
    return (
      <div>
        <p>
          <span style={{ color: 'darkred' }}>secret: </span>
          {this.props.secret}
        </p>
        {!this.props.isAccountConfirmed && (
          <p style={{ background: '#34668D', color: '#fff' }}>Please verify your account to unlock features</p>
        )}
      </div>
    );
  }
}

Dashboard.propTypes = {
  getSecretResource: PropTypes.func.isRequired,
  secret: PropTypes.string.isRequired,
  isAccountConfirmed: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  secret: state.dashboard.secret,
  isAccountConfirmed: Boolean(state.user.isAccountConfirmed),
});

const mapDispatchToProps = {
  ...dashboardActions,
  ...authActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
