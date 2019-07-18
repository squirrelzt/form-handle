import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {auth} from './../../common/auth';
import { Form, Icon, Button, Input, Divider } from 'antd';
import './css/AddForm.css';

class AddForm extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            jsonTemplateData: [],
            formHtml: ''
        };
    }

    componentWillMount() {

    }
    inputHandle = (evt) => {
        this.state.jsonTemplateData = eval('(' + evt.target.value + ')');
    }
    addHandle = () => {
        let formData = this.state.jsonTemplateData;
        let html = '';
        // console.log(formData);
        const formItems = Object.getOwnPropertyNames(formData).map((item, index) => {
            // console.log('-------------------------');
            // console.log(item);
            // console.log(formData[item]);
            let type = formData[item].type;
            let value = formData[item].value;
            return(
                <Form.Item
                    label={item}
                    key={item + index}>
                    <Input key={item + 'input'} value={value} disabled></Input>
                </Form.Item>
            );
        });
        this.setState({
            formHtml: formItems
        });
    }
    render() {
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
                    <span>请输入JSON模板</span>
                    <Input.TextArea className="json-content" onChange={this.inputHandle}>
                    
                    </Input.TextArea>
                    <div className="add-form-btn">
                        <Button type="primary" onClick={this.addHandle}>生成</Button>
                    </div>
                    
                </div>
                <Divider className="add-form-divider"/>
                <div className="display-form" >
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    {this.state.formHtml}
                </Form>
                    
                </div>
            </div>
        );
        
    }
}

AddForm = Form.create()(AddForm);
export default AddForm;