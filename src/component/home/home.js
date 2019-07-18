import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {auth} from './../../common/auth';
import './css/home.css';
import { Menu, Icon, Button, Breadcrumb } from 'antd';
const { SubMenu }  = Menu;
import AddForm from './../addform/AddForm.js';
// import {breadcrumbconfig} from './breadcrumbconfig';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import User from './../user/user.js';
// import Detail from './../user/detail.js';
// import JobSource from './../jobsource/jobsource.js';
// import ChannelList from './../jobsource/channellist/channellist.js';
// import SelectJobType from './../jobsource/channellist/create/SelectJobType.js';
// import CreateJob from './../jobsource/channellist/create/CreateJob.js';
// import JobWorkOrder from './../jobworkorder/jobworkorder.js';
// import ChannelCommissionList from './../channelcommissionlist/channelcommissionlist.js';
// import CommissionDetail from './../channelcommissionlist/commissiondetail/commissiondetail.js';
// import ChannelManage from './../channelmanage/channelmanage.js';
// import ExtendDetail from './../channelmanage/extenddetail.js';
// import Cashout from './../cashout/cashout.js';
// import AuditedCashout from './../cashout/auditedcashout.js';
// import RejectCashout from './../cashout/rejectcashout.js';
// import Tag from './../tag/tag.js';
import './../../entry/css/index.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillMount(){
    };

    render() {
       
        return (
            <div>
            <div id="home-container">
                <aside >
                    <div className="aside-space"></div>
                    <Menu mode="inline"
                          selectedKeys={['addform']}
                          defaultOpenKeys={['addform']}>
                        <Menu.Item key="addform">
                            <Icon type="setting" />
                            <span>生成表单</span>
                        </Menu.Item>
                        <SubMenu key="job-resource-manage"
                                title={
                                    <span>
                                        <Icon type="apartment"></Icon>
                                        <span>表单展示</span>
                                    </span>
                                }>
                        </SubMenu>
                        
                    </Menu>
                </aside>
                <section>
                    
                </section>
                
            </div>
            <div className="content-container" >
                <Route path='/addform' component = { AddForm } />
            </div>
            </div>
        )
    }
}

export default Home;