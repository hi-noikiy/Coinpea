/* 
    我的邀请内容页
*/

import React, { Component } from 'react';
import { Input, Table , Modal , message ,Tabs } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment'
import './MyInviteNew.scss' 
import intl from 'react-intl-universal';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// api
import { myInvite , myInviteBanner , myInviteRank, myRebirth, myInviteList } from '../../api/personal'

import { CLEAR_LOGIN_ACTIONS } from '../LoginRedux';

//img
import friends from '../../assets/07_08.friends.png'
import commission from '../../assets/07_08.commission.png'

import inVite_CN from  '../../assets/11_01.chinese_card.png';
import inVite_EN from  '../../assets/11_02.english_card.png';


const QRCode = require('qrcode.react');
const TabPane = Tabs.TabPane;
const columns1 = [{
    title: intl.get('邀请时间'),
    dataIndex: 'time',
}, {
    title: intl.get('邮箱'),
    dataIndex: 'email',
}];
const columns2 = [{
    title: intl.get('佣金'),
    dataIndex: 'money',
},{
    title: intl.get('币种'),
    dataIndex: 'coin',
},{
    title: intl.get('状态'),
    dataIndex: 'state',
},{
    title: intl.get('邮箱'),
    dataIndex: 'email',
}, {
    title: intl.get('时间'),
    dataIndex: 'time',
}];

export class MyInvite extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:'',
            link:'',
            friends:'',
            commission:'',
            Modal2Visible: false,
            data1: [],
            data2: [],
            data3:[],
            copyPic:require('./../../assets/07_08.copy_button01.svg'),
            loginShow:false,
            bannerUrl:'',
            pagination:{
                total: 0,
                current:1,
                hideOnSinglePage:true,
                pageSize:10,
                showQuickJumper:true,
                next:1,
                pre:1,
                position:"bottom",
                onChange:this.getTabsData
            },
            pagination2:{
                total: 0,
                current:1,
                hideOnSinglePage:true,
                pageSize:10,
                showQuickJumper:true,
                next:1,
                pre:1,
                position:"bottom",
                onChange:this.getTabsData2
            },
        }
    }

    componentDidMount() {
        // var script = document.createElement('script');
        // script.src = "http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=408841";
        // document.body.appendChild(script);
        this.myInvite()
        this.myInviteBanner()
        this.myInviteRank()
        this.myInviteList(this.state.pagination.current);
        this.myRebirth(this.state.pagination2.current);
    }
    myInviteRank = async ()=>{
        const res= await myInviteRank();
        console.log(res)
        if(res.status === 1){
            this.setState({
                data3:res.data
            })
        }
    }

    myInviteBanner= async ()=>{
        const res=await myInviteBanner();
        console.log(res)
        if(res.status === 1){
          
            this.setState({
                bannerUrl:res.data[0]?res.data[0].imgUrl:null
            })
        } else {
            message.error(res.msg)
        }
    }
    myInvite = async ()=>{
        const res= await myInvite();
        console.log(res)
        if(res.status === 1){
            if(res.data.inviteList){
                this.setState({
                    data1:res.data.inviteList,  
                })
            }
            if(res.data.detailList){
                this.setState({
                    data2:res.data.detailList
                })
            }
            this.setState({
                id:res.data.referrerId,
                link: res.data.url,
                friends:res.data.count,
                commission:res.data.BTCCount,  
            })
        }else{
            this.setState({
                loginShow:true
            })
            this.props.nologin();
        }
    }
    //放大显示二维码
    showModel(){
        this.setState({
            Modal2Visible: true
        })
    }

    //隐藏全局二维码
    hideModel(){
        this.setState({
            Modal2Visible: false
        })
    }

    //我的邀请记录
    myInviteList = async(pageNum)=>{
        const res = await myInviteList({numPerPage:10,pageNum});
        if(res.status === 1){
            this.setState({
                data1:res.data,
                pagination:{
                    total:res.page.totalCount,
                    hideOnSinglePage:true
                }
            })
        }else{
            message.error(res.msg)
        }
    }
    

    //返佣记录
    myRebirth = async(pageNum) =>{
        const res = await myRebirth({numPerPage:10,pageNum});
        if(res.status === 1){
            console.log(res.data)
            this.setState({
                data2:res.data,
                pagination2:{
                    total:res.page.totalCount,
                    hideOnSinglePage:true
                }
            })
        }
    }

    //表格分页事件
    getTabsData = (page) => {
        this.myInviteList(page);
        this.setState({ 
            pagination:{
                current:page
            }
        })
    }
    //表格分页事件
    getTabsData2 = (page) => {
        this.myRebirth(page);
        this.setState({ 
            pagination2:{
                current:page
            }
        })
    }

    //合并图片
    getImg = ()=>{
        //生成二维码
        const  code = document.getElementById('code');
        var bgImg = new Image();
        if(this.props.lang === 'en_US'){
            bgImg.src = inVite_EN; 
        }else{
            bgImg.src = inVite_CN; 
        }
        var canvas = document.getElementById('myCanvas');
        canvas.width = 415;
        canvas.height = 750;
        var ctx = canvas.getContext('2d');
        bgImg.crossOrigin = '*';
        var srcImg;
        ctx.rect(0,0,bgImg.width,bgImg.height);
      
        bgImg.onload = () =>{
            ctx.drawImage(bgImg,0,0,415,750);
            ctx.drawImage(code,143,256,code.width,code.height);
            srcImg = canvas.toDataURL("image/png");
            this.setState({
                codepic:srcImg,
                Modal2Visible: true
            })
        }
    }
    //切换
    callback(key) {
      console.log(key);
    }
    rankIndex(index){
         switch(index) {
            case 0:
            return intl.get('第一名')
            case 1:
            return  intl.get('第二名')
            case 2:
            return intl.get('第三名')
            default :
            return intl.get('第一名')
        }
    }
 
    render() {
        const inviteList=this.state.data1.map((item,index)=>{
            return {
                key: index,
                email: item.email,
                time: moment(item.applyTime).format('YYYY-MM-DD HH:mm:ss'),
            }
        })
        const detailList=this.state.data2.map((item,index)=>{
            return {
                money: item.amount,
                key: index,
                coin:item.coinName,
                state:item.status?intl.get('已结算'):intl.get('未结算'),
                email: item.contributor,
                time: moment(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
            }
        })
        const rankList = this.state.data3.map((item,index)=>{
            return (
                <li key={index}>
                    <div className="li1">
                    <p>{this.rankIndex(index)}</p>
                    <p className="colorH">{item.userName.slice(0,3)}****{item.userName.slice(-9)}</p>
                    </div>
                    <div className="li2">
                    <p>{intl.get('获得佣金')}</p>
                    <p className="colorH">{item.brokerage} BTC</p>
                    </div>
                </li>
            )
        })
        return (
            <div className="myinvite">
                <div className="inviteBanner">
                    <img src={this.state.bannerUrl} alt=""/>
                </div>
                <div className="myinvite-top clear">
                    <ul className="inv-rank">
                      { rankList }
                    </ul>
                    <div className="inv-mess" style={{display:this.state.loginShow ? "none" : 'flex'}}>
                      <div className="inv-messL">
                        <h2>{intl.get('我的邀请')}</h2>
                        <h3>{intl.get('邀请码')}：</h3>
                        <div className="link">

                          <Input ref='id' value={this.state.id} onChange={this.changeLink}/>
                          <span onClick={this.copyId.bind(this)} className="copyBtn">{intl.get('复制邀请码')}</span>

                        </div>
                        <ul className="myinvite-top-data clear">
                          <li>
                              <h4><img src={friends} alt='' /><span>{intl.get('邀请总人数')}</span></h4>
                              <span>{this.state.friends}</span>
                          </li>
                          <li>
                              <h4><img src={commission} alt='' /><span>{intl.get("获得返佣")}（BTC）</span></h4>
                              <span>{this.state.commission}</span>
                          </li>
                          <li style={{display:'flex',flexDirection:'column'}}>
                              <h4><img src={commission} alt='' /><span>{intl.get("返佣比例")}</span></h4>
                              <span style={{fontSize:'12px',textAlign:'left'}}>一级{this.state.commission}</span>
                              <span style={{fontSize:'12px',textAlign:'left'}}>二级{this.state.commission}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="inv-messR">
                        <div className="myinvite-top-qrcode">
                            <QRCode  value={this.state.link}  id="code"  renderAs="canvas" size={this.state.size} width='80' height="80" style={{width:'80px',height:'80px'}}/>
                            <a href="javascript:void(0);" onClick={this.getImg} className="scaleBtn">{intl.get('点击放大')}</a>
                            <canvas id="myCanvas" style={{display:'none'}}></canvas>
                            <Modal
                            wrapClassName="vertical-center-modal"
                            closable={false}
                            visible={this.state.Modal2Visible}
                            onCancel={this.hideModel.bind(this)}
                            >
                            <a href={this.state.codepic} download="invitecode.png"><img src={this.state.codepic} style={{width:'415'}} alt=""/></a>
                            </Modal>
                        </div>
                        <div>
                          <h3>{intl.get('邀请链接')}：</h3>
                          <div className="link">
                            <Input ref='link' value={this.state.link} onChange={this.changeLink} style={{width:'314px'}}/>
                            <span onClick={this.copyLink.bind(this)} className="copyBtn">{intl.get('复制邀请链接')}</span>
                          </div>
                          <div id="share" style={{display:"none"}}>
                            <p  className="bdsharebuttonbox" data-tag="share_1">
                              <a className="bds_fbook" data-cmd="fbook" href="javascript:;"></a>
                              <a className="bds_twi" data-cmd="twi" href="javascript:;"></a>
                              <a className="bds_linkedin" data-cmd="linkedin" href="javascript:;"></a>
                              <a className="bds_tsina" data-cmd="tsina" href="javascript:;"></a>
                              <a className="bds_qzone" data-cmd="qzone" href="javascript:;"></a>
                            </p>     
                          </div>
                        </div>
                      </div>                  
                    </div>
                    <div className="myinvite-middle clear" style={{display:this.state.loginShow ? "none" : 'block'}}>
                      <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab={intl.get('邀请记录')} key="1">
                        <Table columns={columns1} pagination={false}  dataSource={inviteList} size="small" locale={{emptyText: intl.get('暂无邀请好友记录') }}/>
                        </TabPane>
                        <TabPane tab={intl.get('返佣记录')} key="2">
                          <Table columns={columns2} pagination={false} dataSource={detailList} size="small" locale={{emptyText: intl.get('暂无返佣记录') }} />
                        </TabPane>
                      </Tabs>
                    </div>
                    <div className="myinv_login" style={{display:this.state.loginShow ? "flex" : 'none'}}>
                        <p>{intl.get('NO_LOGIN')}</p>
                        <div className="login">
                            <Link to="/login" className="btn-login">{intl.get('登录')}</Link>
                            <p className="goLogin">{intl.get('还没有账号')}？<Link to="/reginster">{intl.get('去注册')}</Link></p>
                        </div>
                    </div>
                    <div className="rule">
                      <h4>{intl.get("活动细则")}</h4>
                      <ul>
                          <li>•<span style={{color:'red'}}>{intl.get('细则1')}</span></li>
                          <li>•<span style={{color:'red'}}>{intl.get('细则2')}</span></li>
                          <li>•<span>{intl.get('细则3')}</span></li>
                          <li>•<span>{intl.get('细则4')}</span></li>
                      </ul>
                    </div>
                </div>


            </div>
        )
    }

     //点击复制密钥
    copyLink() {
        const link = this.refs.link.input;
        link.select(); 
        document.execCommand("copy");
        this.setState({copyPic:require('./../../assets/07_08.copy_button02.svg')})
        message.success(intl.get('复制成功'))
        
    }
    copyId() {
        const id = this.refs.id.input;
        id.select(); 
        document.execCommand("copy");
        message.success(intl.get('复制成功'))
    }
}

const mapStateToProps = state => {
    return {
        lang: state.login.lang
    }
}

const mapDispatchToProps = dispatch => ({
    nologin: bindActionCreators(CLEAR_LOGIN_ACTIONS, dispatch),
});


export default connect(mapStateToProps,mapDispatchToProps)(MyInvite);