import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './index.css';
import { Router, Route, hashHistory } from 'react-router';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      {/* make them children of `App` */}
      <Route path="/login" component={LoginForm}/>
      <Route path="/signup" component={SignupForm}/>
    </Route>
  </Router>
), document.getElementById('root'))