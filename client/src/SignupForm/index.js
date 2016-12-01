import React, { Component } from 'react';
import { Form, Icon, Input, InputNumber, Button, Checkbox } from 'antd';
import { Link } from 'react-router';
const FormItem = Form.Item;
import './SignupForm.css'

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const response = await fetch("/signup", {
          method: "POST",
          body: JSON.stringify(values),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        });
        const content = await response.text();
        console.log(content);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="signup-form">
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input addonBefore={<Icon type="mail" />} placeholder="Email" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!' }],
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="Name" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="signup-form-button">
            Sign up
          </Button>
          Already signed up? <Link to="/login">Log in!</Link>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(LoginForm);