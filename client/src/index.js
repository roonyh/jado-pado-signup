import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Home from './Home';
import './index.css';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/login" component={LoginForm}/>
      <Route path="/signup" component={SignupForm}/>
    </Route>
  </Router>
), document.getElementById('root'))