import React, { Component } from 'react';
import {auth} from './../../common/auth';
import { Form, Icon, Button, Input, Divider, message, Spin, Checkbox } from 'antd';
import './css/DataManage.css';

class DataManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formItemData: [],
            data: '',
            loading: false,
            btnVisibility: 'hidden',
            mockDataEnable: false
        };
    }

    componentWillMount() {
        this.fetch({
            id: this.props.match.params.id
        });
        this.fetchData({
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
                this.fetchData({
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
                console.log('-------------------------');
                console.log(eval('(' + result + ')'));
                this.setState({
                    formItemData: eval('(' + result + ')'),
                    loading: false,
                    btnVisibility: 'visible'
                });
            }
        });
    }
    fetchData = (params) => {
        this.setState({
            loading: true
        });
        auth.fetch('/form/getDataByTemplateId','get', 'application/x-www-form-urlencoded', params,(result)=>{
            if ("error" != result) {
                // console.log('-------------------------');
                // console.log(eval('(' + result + ')'));
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
    handleCheckBoxChange = e => {
        console.log(`checked = ${e.target.checked}`)
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
                        <Form className="data-form" {...formItemLayout} style={{visibility:this.state.btnVisibility}} 
                            onSubmit={this.handleSubmit}>
                            <Form.Item
                                label="是否启用">
                                {this.props.form.getFieldDecorator('dataType')(
                                    <Checkbox onChange={this.handleCheckBoxChange}>启用</Checkbox>,
                                )}
                            </Form.Item>
                            {this.state.formItemData ? this.state.formItemData.map(item => {
                                if (item.name) {
                                    let initialValue;
                                    for (let k in this.state.data) {
                                        if (item.key == k) {
                                            initialValue = this.state.data[k];
                                        }
                                    }
                                    return(
                                        <Form.Item
                                            label={item.name}
                                            key={item.key}>
                                            {this.props.form.getFieldDecorator(item.key,{
                                                initialValue: initialValue
                                            })(
                                                <Input ></Input>,
                                            )}
                                        </Form.Item>
                                    );
                                } else {
                                    if (item.children) {
                                        return (
                                            <div key={item.key}>
                                            {item.children.map((subItem, subIndex) => {
                                            return (
                                                <div key={item.key+subIndex} className="sub-zone">
                                                <Divider className="zone-divider"/>
                                                {subItem.children.map(towSubItem => {
                                                    if ('label' == towSubItem.type) {
                                                        return (<div style={{textAlign: 'center', marginBottom:'20px'}}>{towSubItem.name}</div>);
                                                    }
                                                    return(
                                                        <Form.Item
                                                            label={towSubItem.name}
                                                            key={towSubItem.key}>
                                                            {this.props.form.getFieldDecorator(towSubItem.key,{
                                                                initialValue: ''
                                                            })(
                                                                <Input ></Input>,
                                                            )}
                                                        </Form.Item>
                                                    );
                                                })
                                            }
                                                </div>
                                            )
                                            
                                            
                                        })}
                                            </div>
                                        )
                                        
                                    }
                                }
                                
                            })
                            :''}
                            <div className="form-commit-section" >
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