import React, { Component } from 'react';
import LoginForm from './LoginForm';
import './App.css';
import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginForm />
      </div>
    );
  }
}

export default App;
