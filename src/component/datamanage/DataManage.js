import React, { Component } from 'react';
import {auth} from './../../common/auth';
import { Form, Icon, Button, Input, Divider, Tabs, message, Spin } from 'antd';
const { TabPane } = Tabs;
import './css/DataManage.css';
import Item from 'antd/lib/list/Item';

class DataManage extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            loading: false,
        };
    }

    componentWillMount() {
        
    }
    componentDidUpdate() {
       
    }
    componentWillReceiveProps() {
        this.fetch({
            id: this.props.match.params.id
        });
    }
    fetch = (params) => {
        this.setState({
            loading: true
        });
        auth.fetch('/form/getTemplateById','get', 'application/x-www-form-urlencoded', params,(result)=>{
            if ("error" != result) {
                this.setState({
                    data: eval('(' + result + ')'),
                    loading: false
                });
            }
        });
    }
    handleSubmit = (e) => {

    }
    confirmHandle = () => {
        
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
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        {this.state.data ? this.state.data.map(item => {
                            return(
                                <Form.Item
                                    label={item.name}
                                    key={item.key}>
                                    {this.props.form.getFieldDecorator(item.key)(
                                        <Input ></Input>,
                                    )}
                                </Form.Item>
                            );
                        })
                        :''}
                    </Form>
                </Spin>
                
            </div>
        );
        
    }
}

DataManage = Form.create()(DataManage);
export default DataManage;