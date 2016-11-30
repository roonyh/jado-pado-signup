import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import './LoginForm.css'

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
        const response = await fetch("/login", {
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
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="Username" />
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
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a>register now!</a>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(LoginForm);