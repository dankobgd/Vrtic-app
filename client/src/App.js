import React from 'react';
import Navigation from './components/navigation/Navigation';
import '../node_modules/semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/screens/Home';
import Register from './components/screens/Register';
import Login from './components/screens/Login';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
