import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as dashboardActions from '../../redux/dashboard';

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getSecretResource();
  };

  render() {
    return (
      <div style={{ color: 'darkred' }}>
        <h2>{this.props.secret}</h2>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getSecretResource: PropTypes.func.isRequired,
  secret: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  secret: state.dashboard.secret,
});

export default connect(
  mapStateToProps,
  dashboardActions
)(Dashboard);
