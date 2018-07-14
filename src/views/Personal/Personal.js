/* 
    个人中心页入口
*/
import React, { Component } from 'react';
import AccountInfo from '../../components/personal/AccountInfo';
import API from './../../components/personal/API';
import { ACTION_IS_ADD_CLASS } from '../../layouts/NavRedux';
import { connect } from 'react-redux';
import TabHead from '../../components/shared/TabHead';

import intl from 'react-intl-universal';

import './Personal.scss';

class Personal extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            breadText: [intl.get('账户信息'),'API'],
            columText:intl.get('个人中心'),
            showComponent:[<AccountInfo history={this.props.history}/>,<API />],
        }
    }

    componentDidMount() {
        //添加导航背景色
        this.props.dispatch(ACTION_IS_ADD_CLASS());
        
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    render() {
        
        const showKey =this.props.location.search?this.props.location.search.split("?")[1]:0;
        return (
            <div id="personal">
                <TabHead 
                    breadText={this.state.breadText} 
                    columText={this.state.columText}
                    activeIndex={showKey}
                    changeTab={this.changeTab.bind(this)}
                
                />
                <div className="personal-con">
                    {this.state.showComponent[showKey]}
                </div>
            </div>
        )
    }
    //切换面包屑导航
    changeTab(index) {
        this.props.history.push('/personal?'+index)
    }
}
export default connect(
)(Personal)