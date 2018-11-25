import React from 'react';
import Navigation from './components/navigation/Navigation';
import '../node_modules/semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './screens/Home';
import Dashboard from './screens/Dashboard';
import Signup from './screens/Signup';
import Login from './screens/Login';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Router>
          <>
            <Navigation />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/Dashboard' component={Dashboard} />
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
