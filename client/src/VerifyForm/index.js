import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Spin } from 'antd';
import { Link, withRouter } from 'react-router';
const FormItem = Form.Item;
import './VerifyForm.css'

class VerifyForm extends Component {
  constructor() {
    super();
    this.state = {
      code: '',
      codeError: null,
      processing: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const values = {
      code: this.state.code,
    }
    this.setState({processing: true});
    const response = await fetch("/verify", {
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
      this.props.router.push('/')
    } else {
      this.setState({codeError: 'Wrong code'})
    }
  }

  onCodeChange(e) {
    const code = e.target.value;
    this.setState({code});
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="verify-form">
        <FormItem
          validateStatus={this.state.emailError ? "error" : null}
          help={this.state.emailError ? this.state.emailError : null}
        >
          <Input
            addonBefore={<Icon type="lock" />}
            placeholder="Code"
            value={this.state.code}
            onChange={this.onCodeChange}
          />
        </FormItem>

        <FormItem>
          <Spin size="small" spinning={ this.state.processing }>
            <Button type="primary" htmlType="submit" className="verify-form-button">
              Verify
            </Button>
          </Spin>
        </FormItem>
      </Form>
    );
  }
}

VerifyForm.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(Form.create()(VerifyForm));