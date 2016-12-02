import React, { Component } from 'react';
import { Form, Icon, Input, Button, Spin, Select } from 'antd';
import { Link, withRouter } from 'react-router';
import './SignupForm.css'

const FormItem = Form.Item;
const Option = Select.Option;

class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      processing: false,
      email: '',
      name: '',
      password: '',
      phone: '',
      countryCode: '+94',
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
    this.onCountryCodeChange = this.onCountryCodeChange.bind(this);
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
      countryCode: this.state.countryCode,
    }
    this.setState({processing: true});
    const response = await fetch("/signup", {
      method: "POST",
      body: JSON.stringify(values),
      credentials: 'include',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    this.setState({processing: false})
    if(response.ok) {
      this.props.router.push('/login');
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
  onCountryCodeChange(countryCode) {
    this.setState({countryCode});
  }

  onEmailBlur(e) {
    const email = e.target.value;
    const valid = /\S+@\S+\.\S+/.test(email); // Testing for xxx@xxx.xxx
    if(!valid) {
      this.setState({emailError: 'Sorry, this does not look like an email'})
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const prefixSelector = (
      <Select value={this.state.countryCode} style={{width: '60px'}} onChange={this.onCountryCodeChange}>
        <Option value="+1">+1</Option>
        <Option value="+94">+94</Option>
        <Option value="+86">+86</Option>
      </Select>
    );

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
        <FormItem
          validateStatus={this.state.phoneError ? "error" : null}
          help={this.state.phoneError ? this.state.phoneError : null}
        >
          <Input
            addonBefore={prefixSelector}
            placeholder="Phone"
            value={this.state.phone}
            onChange={this.onPhoneChange}
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

export default withRouter(Form.create()(SignupForm));