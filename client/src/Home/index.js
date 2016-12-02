import React, { Component } from 'react';
import { Card } from 'antd';
import './Home.css'
import { Link } from 'react-router';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      userChecked: false,
      user: null,
    }
    this.checkUser = this.checkUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  async logout() {
    await fetch("/logout", {
      method: "POST",
      credentials: 'include',
      mode: 'cors',
    });
    this.setState({ user: null });
  }

  async checkUser() {
    const response = await fetch("/user", {
      method: "GET",
      credentials: 'include',
      mode: 'cors',
    });
    const user = await response.json();
    console.log(user);
    this.setState({ userChecked: true, user});
  }

  componentDidMount() {
    this.checkUser();
  }

  render() {
    const renderNotLoggedIn = () => (
      <div>
        <div>This is a single page app built in the test stage of Jado Pado interview process.</div>
        <div><Link to="/signup">Sign up</Link> to continue.</div>
        <div>Have an account? <Link to="/login">Log in</Link>.</div>
      </div>
    )

    const renderLoggedIn = () => (
      <div>
        <div>This is a single page app built in the test stage of Jado Pado interview process.</div>
        <div>You are logged in now.</div>
        <div>Your name is {this.state.user.name}</div>
        <div>Not {this.state.user.name}? <a onClick={this.logout}>logout</a></div>
      </div>
    )

    return (
      <div style={{ textAlign: 'center'}}>
        <h1>Hello there!</h1><br/>
        { this.state.user!==null ? renderLoggedIn() : renderNotLoggedIn() }
      </div>
    )
  }
}