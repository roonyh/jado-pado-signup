import React, { Component } from 'react';
import { Form, Icon, Input, Button, Spin } from 'antd';
import { Link } from 'react-router';
const FormItem = Form.Item;
import './SignupForm.css'

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      processing: false,
      email: '',
      name: '',
      password: '',
      phone: '',
      emailError: null,
      nameError: null,
      passwordError: null,
      phoneError: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onEmailBlur = this.onEmailBlur.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    if(this.state.emailError || this.state.phoneError || this.state.passwordError){
      return;
    }

    const values = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      phone: this.state.phone,
    }
    this.setState({processing: true})
    const response = await fetch("/signup", {
      method: "POST",
      body: JSON.stringify(values),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    this.setState({processing: false})
    if(response.ok) {
      return;
    };
    const content = await response.json();
    switch (content.error) {
      case 'EMAIL_EXISTS':
        console.log('EMAIL_EXISTS');
        this.setState({emailError: 'Email you entered already exists'})
        break;
      default:
        console.log(content.error);
    }
  }

  onEmailChange(e) {
    const email = e.target.value;
    this.setState({email, emailError: null});
  }
  onNameChange(e) {
    const name = e.target.value;
    this.setState({name});
  }
  onPasswordChange(e) {
    const password = e.target.value;
    this.setState({password});
  }
  onPhoneChange(e) {
    const phone = e.target.value;
    this.setState({phone});
  }

  onEmailBlur(e) {
    const email = e.target.value;
    const valid = /.@.\../.test(email);
    if(!valid) {
      this.setState({emailError: 'Sorry, this does not look like an email'})
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="signup-form">
        <FormItem
          validateStatus={this.state.emailError ? "error" : null}
          help={this.state.emailError ? this.state.emailError : null}
        >
          <Input
            addonBefore={<Icon type="mail" />}
            placeholder="Email"
            value={this.state.email}
            onChange={this.onEmailChange}
            onBlur={this.onEmailBlur}
          />
        </FormItem>
        <FormItem
          validateStatus={this.state.nameError ? "error" : null}
          help={this.state.nameError ? this.state.nameError : null}
        >
          <Input
            addonBefore={<Icon type="user" />}
            placeholder="Name"
            value={this.state.name}
            onChange={this.onNameChange}
          />
        </FormItem>
        <FormItem>
          <Input
            addonBefore={<Icon type="lock" />}
            type="password"
            placeholder="Password"
            onChange={this.onPasswordChange}
          />
        </FormItem>
        <FormItem>
          <Spin size="small" spinning={ this.state.processing }>
            <Button type="primary" htmlType="submit" className="signup-form-button">
              Sign up
            </Button>
          </Spin>
          Already signed up? <Link to="/login">Log in!</Link>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(LoginForm);