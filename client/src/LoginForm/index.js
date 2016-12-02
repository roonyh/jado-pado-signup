import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Spin } from 'antd';
import { Link, withRouter } from 'react-router';
const FormItem = Form.Item;
import './LoginForm.css'

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      emailError: null,
      passwordError: null,
      processing: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const values = {
      email: this.state.email,
      password: this.state.password,
    }
    this.setState({processing: true});
    const response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify(values),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    const content = await response.text();
    this.setState({processing: false});
    console.log(content);
    if(response.ok){
      this.props.router.push('/verify')
    } else {
      this.setState({emailError: 'Wrong password email combination'})
      this.setState({passwordError: 'Wrong password email combination'})
    }
  }

  onEmailChange(e) {
    const email = e.target.value;
    this.setState({email, emailError: null, passwordError: null});
  }
  onPasswordChange(e) {
    const password = e.target.value;
    this.setState({password, emailError: null, passwordError: null});
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem
          validateStatus={this.state.emailError ? "error" : null}
          help={this.state.emailError ? this.state.emailError : null}
        >
          <Input
            addonBefore={<Icon type="mail" />}
            placeholder="Email"
            value={this.state.email}
            onChange={this.onEmailChange}
          />
        </FormItem>
        <FormItem
          validateStatus={this.state.passwordError ? "error" : null}
          help={this.state.passwordError ? this.state.passwordError : null}
        >
          <Input
            addonBefore={<Icon type="lock" />}
            type="password"
            placeholder="Password"
            onChange={this.onPasswordChange}
          />
        </FormItem>
        <FormItem>
          <Checkbox>Remember me</Checkbox>
          <a className="login-form-forgot">Forgot password</a>
          <Spin size="small" spinning={ this.state.processing }>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Spin>
          Or <Link to="/signup">Sign up</Link> now!
        </FormItem>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(Form.create()(LoginForm));