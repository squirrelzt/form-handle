import React, { Component } from 'react';
import {auth} from './../../common/auth';
import { Form, Icon, Button, Input, Divider, Tabs, message, Spin } from 'antd';
const { TabPane } = Tabs;
import './css/Display.css';

class Display extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            loading: false,
            selectedTabKey: ''
        };
    }

    componentWillMount() {
        this.fetch();
    }
    fetch = (params) => {
        this.setState({
            loading: true
        });
        auth.fetch('/bigshow/form/query','post', 'application/json', params,(result)=>{
            if ("error" != result) {
                this.setState({
                    loading: false,
                    data: result
                });
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
    tabChangeHandle = key => {
        console.log(key);
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
                <Spin size="large" spinning={this.state.loading}>
                    <Tabs onChange={this.onChange}>
                        {this.state.data.length>0?this.state.data.map((item, index) => {
                            let jsonObj = eval('(' + item.formContent + ')');
                            let tabKey = Object.keys(jsonObj)[0];
                            this.state.selectedTabKey = tabKey;
                            const formItems = jsonObj[tabKey].map((objItem, index) => {
                                return(
                                    <Form.Item
                                        label={objItem}
                                        key={tabKey + index}>
                                        {this.props.form.getFieldDecorator(objItem)(
                                            <Input ></Input>,
                                        )}
                                    </Form.Item>
                                );
                            });
                            return(
                                <TabPane tab={tabKey} key={index} onChange={this.tabChangeHandle}>
                                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                        {formItems}
                                        <div className="confirm-section" >
                                            <Button type="primary" className="confirm-btn" onClick={this.confirmHandle}>确认</Button>
                                        </div>
                                    </Form>
                                </TabPane>
                            );
                        }):""}
                    </Tabs>
                </Spin>
            </div>
        );
        
    }
}

Display = Form.create()(Display);
export default Display;