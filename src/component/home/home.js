import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {auth} from './../../common/auth';
import './css/home.css';
import { Menu, Icon, Button, Breadcrumb } from 'antd';
const { SubMenu }  = Menu;
import AddForm from './../addform/AddForm';
import Display from './../display/Display';
import ConfigTemplate from './../configtemplate/ConfigTemplate';
import DataManage from './../datamanage/DataManage';
import MockData from './../mockdata/MockData';
import TokenConfig from './../tokenconfig/TokenConfig';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './../../entry/css/index.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedKeys: ''
        };
    }

    componentWillMount(){
        this.fetch();
    };
    fetch = (params) => {
        this.setState({
            loading: true
        });
        auth.fetch('/form/query','post', 'application/json', params,(result)=>{
            if ("error" != result) {
                this.setState({
                    data: result
                });
            }
        });
    }
    handleMenuChange = (e) => {
        this.setState({
            selectedKeys: e.key
        });
    }
    render() {
        let url = this.props.location.pathname;
        let urlArray = [];
        if (url.substr(0,1) == "/") {
            urlArray = url.replace("/", "").split("/");
        } 
        if (urlArray[1]) {
            this.state.selectedKeys =  urlArray[1];
        } else {
            this.state.selectedKeys =  urlArray[0];
        }
        return (
            <div>
            <div id="home-container">
                <header>
                    <span>大屏展示数据配置系统</span>
                </header>
                <aside >
                    <div className="aside-space"></div>
                    <Menu mode="inline"
                          selectedKeys={[this.state.selectedKeys]}
                          defaultOpenKeys={['mockdata']}
                          onClick={this.handleMenuChange}>
                        <Menu.Item key="tokenconfig">
                            <Link to="/tokenconfig">
                                <Icon type="security-scan" />
                                <span>配置token</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="addform">
                            <Link to="/addform">
                                <Icon type="setting" />
                                <span>表单处理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="configtemplate">
                            <Link to="/configtemplate">
                                <Icon type="setting" />
                                <span>配置模板</span>
                            </Link>
                        </Menu.Item>
                        {/* <Menu.Item key="display">
                            <Link to="/display">
                                <Icon type="apartment" />
                                <span>菜单展示</span>
                            </Link>
                        </Menu.Item> */}
                        {/* <SubMenu key="datamanage"
                            title={
                                <span>
                                <Icon type="apartment"></Icon>
                                <span>数据管理</span>
                            </span>
                            }>
                            {this.state.data ? this.state.data.map((item)=>{
                                return(
                                    <Menu.Item key={item.id}>
                                        <Link to={"/datamanage/" + item.id}>
                                            <span>{item.formName}</span>
                                        </Link>
                                    </Menu.Item>
                                );
                            })
                        :''}
                        </SubMenu> */}
                        <SubMenu key="mockdata"
                            title={
                                <span>
                                <Icon type="apartment"></Icon>
                                <span>数据管理</span>
                            </span>
                            }>
                            {this.state.data ? this.state.data.map((item)=>{
                                return(
                                    <Menu.Item key={item.id}>
                                        <Link to={"/mockdata/" + item.id}>
                                            <span>{item.formName}</span>
                                        </Link>
                                    </Menu.Item>
                                );
                            })
                        :''}
                        </SubMenu>
                    </Menu>
                </aside>
            </div>
            <div className="content-container" >
                <Route path='/addform' component = { AddForm } />
                {/* <Route path='/display' component = { Display } /> */}
                <Route path='/configtemplate' component = { ConfigTemplate } />
                {/* <Route path='/datamanage/:id' component = { DataManage } /> */}
                <Route path='/mockdata/:id' component = { MockData } />
                <Route path='/tokenconfig' component = { TokenConfig } />
            </div>
            </div>
        )
    }
}

export default Home;