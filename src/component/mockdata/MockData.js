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
            schema: {}
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
                // console.log('-------------------------');
                this.setState({
                    formItemData: eval('(' + result + ')'),
                    loading: false,
                    btnVisibility: 'visible',
                    jsonDta: result,
                    schema: {
                        title: "",
                        type: "object",
                        properties: eval('(' + result + ')')
                    }
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
                    btnVisibility: 'visible',
                    jsonDta: result
                });
            }
        });
    }
    handleSubmit = e => {
        console.log('-------------------------------');
        console.log(e.formData);
    }
    render() {
        // const log = (type) => console.log.bind(console, type);
        return (
            <div id="data-manage-container">
                <Spin size="large" spinning={this.state.loading}>
                    <Form schema={this.state.schema}
                        // onChange={log("changed")}
                        // onSubmit={log("submitted")}
                        onSubmit={this.handleSubmit}
                        // onError={log("errors")} 
                        />
                </Spin>
               
            </div>
        );
    }
}

export default MockData;