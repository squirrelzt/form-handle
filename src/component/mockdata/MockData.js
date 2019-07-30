import React, { Component } from 'react';
import {auth} from './../../common/auth';
import { Icon, Button, Input, Divider, message, Spin, Checkbox } from 'antd';
import './css/MockData.css';
import Form from "react-jsonschema-form";
import 'bootstrap/dist/css/bootstrap.css';

class MockData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formItemData: [],
            data: '',
            jsonDta: '',
            loading: false,
            btnVisibility: 'hidden',
            mockDataEnable: false,
            schema: {},
            id: ''
        };
    }

    componentWillMount() {
        this.setState({
            id: this.props.match.params.id
        });
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
                this.setState({
                    id: nextProps.match.params.id
                });
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
        auth.fetch('/bigshow/form/getTemplateById','get', 'application/x-www-form-urlencoded', params,(result)=>{
            if ("error" != result) {
                // console.log('-------------------------');
                this.setState({
                    formItemData: eval('(' + result + ')'),
                    loading: false,
                    btnVisibility: 'visible',
                    schema: {
                        title: "",
                        type: "object",
                        properties: eval('(' + result + ')')
                    }
                });
            }
            this.setState({
                loading: false
            });
        });
    }
    fetchData = (params) => {
        this.setState({
            loading: true
        });
        auth.fetch('/bigshow/form/getDataByTemplateId','get', 'application/x-www-form-urlencoded', params,(result)=>{
            if ("error" != result) {
                // console.log('-------------------------');
                // console.log(eval('(' + result + ')'));
                this.setState({
                    data: eval('(' + result + ')'),
                    btnVisibility: 'visible',
                    jsonDta: result
                });
            }
            this.setState({
                loading: false
            });
        });
    }
    handleSubmit = e => {
        // console.log('-------------------------------');
        // console.log(e.formData);
        this.fetchSubmit({
            formId: this.state.id,
            mockDataEnable: this.state.mockDataEnable,
            mockData: e.formData
        });
    }
    fetchSubmit = (params) => {
        this.setState({
            loading: true
        });
        // console.log('-------------------------------');
        // console.log(params);
        auth.fetch('/bigshow/form/createOrUpdateData','post', 'application/json', JSON.stringify(params),(result)=>{
            if ("error" != result) {
                message.success("新增或修改Mock数据成功！")
            }
            this.setState({
                loading: false
            });
        });
    }
    onCheckboxChange = e => {
        this.setState({
            mockDataEnable:e.target.checked
        })
    }
    render() {
        // const log = (type) => console.log.bind(console, type);
        return (
            <div id="mock-data-container">
                <div className="section">
                    <Spin size="large" spinning={this.state.loading}>
                        <Checkbox className="mock-enable-checkbox" onChange={this.onCheckboxChange}>
                            是否启用
                        </Checkbox>
                        <Form className="json-form" schema={this.state.schema}
                            // onChange={log("changed")}
                            // onSubmit={log("submitted")}
                            onSubmit={this.handleSubmit}
                            // onError={log("errors")} 
                            />
                    </Spin>
                </div>
            </div>
        );
    }
}

export default MockData;