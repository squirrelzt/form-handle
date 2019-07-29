import React, { Component } from 'react';
import {auth} from '../../common/auth';
import { Form, Icon, Button, Input, Divider, message, Spin, Checkbox } from 'antd';
import './css/TokenConfig.css';

class TokenConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
          
        };
    }

    componentWillMount() {
        
    }
    componentDidUpdate() {
       
    }
    componentWillReceiveProps(nextProps) {
        
    }
    handleSubmit = e => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
              console.log('------------------')
              console.log(values.token);
              if (values.token) {
                localStorage.token = values.token;
                message.success('TOKEN 配置成功 ！')
              } else {
                message.error('TOKEN 不能为空 ！')
              }
            }
          });
    }
    render() {
        const { getFieldDecorator, getFieldError, isFieldValidating, isFieldTouched, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 10 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 10 },
                sm: { span: 16 },
            },
        };
        return (
            <div id="token-config-container">
                <div className="section">
                    <Form className="data-form" {...formItemLayout} 
                        onSubmit={this.handleSubmit}>
                        <Form.Item
                            label="TOKEN">
                            {this.props.form.getFieldDecorator('token')(
                                <Input placeholder="请输入token"></Input>,
                            )}
                        </Form.Item>
                        <div className="form-commit-section" >
                            <Button type="primary" className="commit-btn" onClick={this.handleSubmit}>确认</Button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

TokenConfig = Form.create()(TokenConfig);
export default TokenConfig;