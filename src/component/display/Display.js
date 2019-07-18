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
            data: []
        };
    }

    componentWillMount() {

    }
    onChange = () => {

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
            <div id="display-container">
               <Tabs defaultActiveKey="1" onChange={this.onChange}>
                    <TabPane tab="模板1" key="1">模板1</TabPane>
                    <TabPane tab="模板2" key="2">模板2</TabPane>
                    <TabPane tab="模板3" key="3">模板3</TabPane>
                </Tabs>
            </div>
        );
        
    }
}

Display = Form.create()(Display);
export default Display;