import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from '../../redux/auth';

class Navigation extends React.Component {
  state = {};

  handleItemClick = (e, { name }) => {
    if (name === 'Logout') {
      this.props.signUserOut();
      this.props.history.push('/');
    }
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        {!this.props.isAuthenticated ? (
          <>
            <Menu.Item as={Link} to='/' name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick}>
              Home
            </Menu.Item>
            <Menu.Item
              as={Link}
              to='/signup'
              name='Signup'
              active={activeItem === 'Signup'}
              onClick={this.handleItemClick}
            >
              Signup
            </Menu.Item>
            <Menu.Item
              as={Link}
              to='/login'
              name='Login'
              active={activeItem === 'Login'}
              onClick={this.handleItemClick}
            >
              Login
            </Menu.Item>

            <Menu.Item
              as={Link}
              to='/dashboard'
              name='Dashboard'
              active={activeItem === 'Dashboard'}
              onClick={this.handleItemClick}
            >
              Dashboard
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item as={Link} to='/' name='Home' active={activeItem === 'reviews'} onClick={this.handleItemClick}>
              Home
            </Menu.Item>
            <Menu.Item
              as={Link}
              to='/asdf'
              name='test404'
              active={activeItem === 'test404'}
              onClick={this.handleItemClick}
            >
              test404
            </Menu.Item>

            <Menu.Item
              as={Link}
              to='/dashboard'
              name='Dashboard'
              active={activeItem === 'Dashboard'}
              onClick={this.handleItemClick}
            >
              Dashboard
            </Menu.Item>

            <Menu.Item as={Link} to='/' name='Logout' active={activeItem === 'Logout'} onClick={this.handleItemClick}>
              Logout
            </Menu.Item>
          </>
        )}
      </Menu>
    );
  }
}

Navigation.propTypes = {
  signUserOut: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
}

export default connect(
  mapStateToProps,
  authActions
)(Navigation);
