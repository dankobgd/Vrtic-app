import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from '../redux/auth';

class ConfirmationPage extends Component {
  state = {
    loading: true,
    success: false,
  };

  async componentDidMount() {
    try {
      await this.props.confirmEmail(this.props.match.params.confirmationToken);
      this.setState({ loading: false, success: true });
    } catch (error) {
      this.setState({ loading: false, success: false });
    }
  }

  render() {
    const { loading, success } = this.state;

    return (
      <div>
        <h1>ConfirmationPage</h1>
        {loading && (
          <Message icon>
            <Icon name='circle notched' loading />
            <Message.Header>Validating your email</Message.Header>
          </Message>
        )}

        {!loading && success && (
          <Message success icon>
            <Icon name='checkmark' />
            <Message.Content>
              <Message.Header>Thank you, your account has been verified</Message.Header>
              <Link to='/dashboard'>Go to your dashboard</Link>
            </Message.Content>
          </Message>
        )}

        {!loading && !success && (
          <Message negative icon>
            <Icon name='warning sign' />
            <Message.Content>
              <Message.Header>Ooops, invalid token it seems</Message.Header>
            </Message.Content>
          </Message>
        )}
      </div>
    );
  }
}

ConfirmationPage.propTypes = {
  confirmEmail: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      confirmationToken: PropTypes.string.isRequired,
    }),
  }),
};

export default connect(
  null,
  authActions
)(ConfirmationPage);
