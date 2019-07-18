import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {auth} from './../../common/auth';
import { Form, Icon, Button, Input, Divider, Tabs } from 'antd';
const { TabPane } = Tabs;
import './css/Display.css';

class Display extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            formHtml: ''
        };
    }

    componentWillMount() {
        this.fetch();
    }
    fetch = (params) => {
        auth.fetch('/form/query','get',params,(result)=>{
            if ("error" == result) {
                console.log(result);
            } else {
            //    console.log('----------------------');
            //    console.log(result);
               this.setState({
                   data: result
               })
            }
        });
    }
    onChange = () => {

    }
    confirmHandle = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
            //   console.log('------------------');
            }
          });
    }
    handleSubmit = () => {

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
            <div id="display-container">
               <Tabs defaultActiveKey="1" onChange={this.onChange}>
                    {this.state.data.length>0?this.state.data.map((item, index) => {
                        let obj = Object.keys(item);
                        const formItems = item[obj[0]].map((item, index) => {
                            return(
                                <Form.Item
                                    label={item}
                                    key={item + index}>
                                    {this.props.form.getFieldDecorator(item)(
                                        <Input ></Input>,
                                    )}
                                </Form.Item>
                            );
                        });
                        return(
                            <TabPane tab={obj[0]} key={index}>
                                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                    {formItems}
                                    <div className="confirm-section" >
                                        <Button type="primary" className="confirm-btn" 
                                        onClick={this.confirmHandle}>确认</Button>
                                    </div>
                                </Form>
                            </TabPane>
                        );
                    }):""}
                </Tabs>
            </div>
        );
        
    }
}

Display = Form.create()(Display);
export default Display;