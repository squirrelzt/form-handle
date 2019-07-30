import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {auth} from './../../common/auth';
import { Form, Icon, Button, Input, Divider, message } from 'antd';
import './css/AddForm.css';

class AddForm extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            jsonTemplateData: [],
            formHtml: '',
            confirmVisibility: 'hidden',
        };
    }

    componentWillMount() {

    }
    inputHandle = (evt) => {
        if (evt.target.value) {
            this.setState({
                jsonTemplateData: eval('(' + evt.target.value + ')')
            });
        } else {
            this.setState({
                jsonTemplateData: []
            });
        }
        
    }
    addHandle = () => {
        this.setState({
            formHtml: '',
            confirmVisibility: 'hidden'
        });
        let formData = this.state.jsonTemplateData;
        if (formData.length == 0) {
            message.warn('模板内容不能为空 ！')
            return;
        }
        if (!this.isJson(formData)) {
            message.error('JSON字符串格式错误 ！');
            return;
        }
        let html = '';
        // console.log(formData);
        let obj = Object.keys(formData);
        // console.log('===============');
        // console.log(obj);
        const formItems = formData[obj[0]].map((item, index) => {
            return(
                <Form.Item
                    label={item}
                    key={item + index}>
                    {this.props.form.getFieldDecorator(item)(
                        <Input disabled></Input>,
                    )}
                </Form.Item>
            );
        });
        const formContent = <div>
                                <div className="form-name">
                                    <span>{obj[0]}</span>
                                </div>
                                {formItems}
                            </div>;
        this.setState({
            formHtml: formContent,
            jsonTemplateData: [],
            confirmVisibility: 'visible'
        });
    }
    isJson = (formData) => {
        if (typeof formData == 'object' && formData) {
            return true;
        }
        try {
            let obj = JSON.parse(formData);
            if (typeof obj == 'object' && obj) {
                return true;
            } else {
                return false;
            }
        } catch(e) {
            console.log(e);
            return false;
        }
    }
    confirmHandle = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
            //   console.log('Received values of form: ', values);
            //   console.log('------------------');
              console.log(this.state.jsonTemplateData);
              this.fetch(this.state.jsonTemplateData)
            }
          });
    }
    fetch = (params) => {
        auth.fetch('/bigshow/form/createOrUpdate','post', 'application/json', JSON.stringify(params),(result)=>{
            if ("error" != result) {
               console.log('----------------------');
               console.log(result);
               this.setState({
                   data: result,
                   confirmVisibility: 'hidden'
               });
               message.success("新增或修改表单模板成功");
            } else {
                message.error("新增或修改表单模板失败");
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
            <div id="add-form-container">
                <div className="add-json">
                    <div className="add-json-title">
                        <span>JSON模板</span>
                    </div>
                    <Input.TextArea className="json-content" placeholder="请输入JSON模板" onChange={this.inputHandle} />
                    <div className="add-form-btn">
                        <Button type="primary" onClick={this.addHandle}>生成预览</Button>
                    </div>
                </div>
                <div className="display-form" style={{visibility:this.state.confirmVisibility}}>
                    <div className="display-form-title">
                        <span>表单预览</span>
                    </div>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        {this.state.formHtml}
                        <div className="confirm-section" >
                            <Button type="primary" className="confirm-btn" 
                            onClick={this.confirmHandle}>确认</Button>
                        </div>
                    </Form>
                </div>
            </div>
        );
        
    }
}

AddForm = Form.create()(AddForm);
export default AddForm;