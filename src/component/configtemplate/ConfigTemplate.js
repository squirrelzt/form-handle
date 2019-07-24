import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {auth} from './../../common/auth';
import { Form, Icon, Button, Input, Divider, message, Row, Col } from 'antd';
const InputGroup = Input.Group;
import './css/ConfigTemplate.css';

let id = 0;

class ConfigTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentWillMount() {

    }
    
    fetch = (params) => {
        auth.fetch('/form/createOrUpdate','post', 'application/json', JSON.stringify(params),(result)=>{
            if ("error" != result) {
               console.log('----------------------');
               console.log(result);
               this.setState({
                   data: result,
                   confirmVisibility: 'hidden'
               });
            }
        });
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            const { keys, names } = values;
            console.log('Received values of form: ', values);
            console.log('Merged values:', keys.map(key => names[key]));
        }
        });
    }
    remove = k => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
          return;
        }
    
        // can use data-binding to set
        form.setFieldsValue({
          keys: keys.filter(key => key !== k),
        });
    };
    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
          keys: nextKeys,
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
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
              xs: { span: 24, offset: 0 },
              sm: { span: 20, offset: 4 },
            },
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Form.Item
              {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
              label={index === 0 ? '属性' : ''}
              required={false}
              key={k}
            >
              {getFieldDecorator(`names[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "Please input properties's name or delete this field.",
                  },
                ],
            //   })(<Input placeholder="properties name" style={{ width: '60%', marginRight: 8 }} />)}
                })(<InputGroup>
                     <Row gutter={8}>
                        <Col span={5}>
                        <Input defaultValue="0571" />
                        </Col>
                        <Col span={8}>
                        <Input defaultValue="26888888" />
                        </Col>
                    </Row>
                </InputGroup>)}
              {keys.length > 1 ? (
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  onClick={() => this.remove(k)}
                />
              ) : null}
            </Form.Item>
          ));
        return (
            <div id="config-template-container">
                <Form className="data-form" {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item
                        label="模板名称">
                        {this.props.form.getFieldDecorator('formName')(
                            <Input></Input>,
                        )}
                    </Form.Item>
                    {formItems}
                    <Form.Item {...formItemLayoutWithOutLabel}>
                        <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                            <Icon type="plus" /> 添加模板元素
                        </Button>
                    </Form.Item>
                    <div className="form-commit-section" >
                        <Button type="primary" className="commit-btn" onClick={this.handleSubmit}>确认</Button>
                    </div>
                </Form>
            </div>
        );
        
    }
}

ConfigTemplate = Form.create()(ConfigTemplate);
export default ConfigTemplate;