import React, { Component } from 'react';
import {auth} from './../../common/auth';
import { Form, Icon, Button, Input, Divider, message, Spin } from 'antd';
import './css/DataManage.css';

class DataManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            btnVisibility: 'hidden'
        };
    }

    componentWillMount() {
        this.fetch({
            id: this.props.match.params.id
        });
    }
    componentDidUpdate() {
       
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            if (nextProps.match.params.id) {
                this.fetch({
                    id: nextProps.match.params.id
                });
            }
        }
    }
    fetch = (params) => {
        this.setState({
            loading: true
        });
        auth.fetch('/form/getTemplateById','get', 'application/x-www-form-urlencoded', params,(result)=>{
            if ("error" != result) {
                this.setState({
                    data: eval('(' + result + ')'),
                    loading: false,
                    btnVisibility: 'visible'
                });
            }
        });
    }
    handleSubmit = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
            //   console.log('------------------');
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
            <div id="data-manage-container">
                <div className="section">
                    <Spin size="large" spinning={this.state.loading}>
                        <Form className="data-form" {...formItemLayout} onSubmit={this.handleSubmit}>
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
                            <div className="form-commit-section" style={{visibility:this.state.btnVisibility}}>
                                <Button type="primary" className="commit-btn" onClick={this.handleSubmit}>确认</Button>
                            </div>
                        </Form>
                    </Spin>
                </div>
            </div>
        );
    }
}

DataManage = Form.create()(DataManage);
export default DataManage;