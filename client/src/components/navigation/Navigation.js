import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const items = [
  { key: 'Home', name: 'Home', as: Link, to: '/' },
  { key: 'Signup', name: 'Signup', as: Link, to: '/signup' },
  { key: 'Login', name: 'Login', as: Link, to: '/login' },
  { key: '404', name: 'test', as: Link, to: '/404' },
];

function Navigation() {
  return <Menu items={items} />;
}

export default Navigation;
