import React from 'react';
import Navigation from '../components/navigation/Navigation';
import '../../node_modules/semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from '../screens/home/Home';
import Dashboard from '../screens/dashboard/Dashboard';
import Signup from '../screens/signup/SignupContainer';
import Login from '../screens/login/LoginContainer';
import ConfirmationPage from '../screens/ConfirmationPage';
import { Provider } from 'react-redux';
import store from '../store/store';
import AuthGuard from '../components/AuthGuard';
import ForgotPassword from '../screens/ForgotPassword';
import ResetPassword from '../screens/ResetPassword';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Router>
          <>
            <Navigation />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/forgotPassword' component={ForgotPassword} />
              <Route exact path='/resetPassword/:resetToken' component={ResetPassword} />
              <Route exact path='/confirmation/:confirmationToken' component={ConfirmationPage} />
              <Route exact path='/Dashboard' component={AuthGuard(Dashboard)} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/login' component={Login} />
              <Route render={() => <h1>PAGE NOT FOUND 404</h1>} />
            </Switch>
          </>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
