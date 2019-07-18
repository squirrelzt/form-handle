import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {auth} from './../../common/auth';
import './css/home.css';
import { Menu, Icon, Button, Breadcrumb } from 'antd';
const { SubMenu }  = Menu;
import AddForm from './../addform/AddForm.js';
import Display from './../display/Display.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './../../entry/css/index.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedKeys: 'addform'
        };
    }

    componentWillMount(){
    };

    menuChange = (evt) => {
        this.setState({
            selectedKeys: evt.key
        })
    }
    render() {
        let url = this.props.location.pathname;
        let urlArray = [];
        if (url.substr(0,1) == "/") {
            urlArray = url.replace("/", "").split("/");
        } 
        this.state.selectedKeys = urlArray[0];
        return (
            <div>
            <div id="home-container">
                <aside >
                    <div className="aside-space"></div>
                    <Menu mode="inline"
                          selectedKeys={[this.state.selectedKeys]}
                          defaultOpenKeys={['addform']}
                          onClick={this.menuChange}>
                        <Menu.Item key="addform">
                            <Link to="/addform">
                                <Icon type="setting" />
                                <span>生成表单</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="display">
                            <Link to="/display">
                                <Icon type="apartment" />
                                <span>表单展示</span>
                            </Link>
                            
                        </Menu.Item>
                    </Menu>
                </aside>
                <section>
                    
                </section>
                
            </div>
            <div className="content-container" >
                <Route path='/addform' component = { AddForm } />
                <Route path='/display' component = { Display } />
            </div>
            </div>
        )
    }
}

export default Home;