import React, { Component } from 'react';
import { Card } from 'antd';
import './Home.css'
import { Link } from 'react-router';

export default class Home extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center'}}>
        <h1>Hello there!</h1><br/>
        <div>This is a single page app built in the test stage of Jado Pado interview process.</div>
        <div><Link to="/signup">Sign up</Link> to continue.</div>
      </div>
    )
  }
}