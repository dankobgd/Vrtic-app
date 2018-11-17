import React from 'react';
import Navigation from './components/navigation/Navigation';
import '../node_modules/semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/screens/Home';
import Register from './components/screens/Register';
import Login from './components/screens/Login';

function App() {
  return (
    <div className='App'>
      <Router>
        <>
          <Navigation />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route render={() => <h1>PAGE NOT FOUND 404</h1>} />
          </Switch>
        </>
      </Router>
    </div>
  );
}

export default App;
