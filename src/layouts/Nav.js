/* 
    头部导航
*/
import React from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cs  from 'classnames';
import intl from 'react-intl-universal';

//action
import { Icon,  Carousel,   Popover, Message} from 'antd';
import { ACTION_IS_ADD_CLASS,
         ACTION_IS_HIDE_NOTIFY,
		 ACTION_IS_REMOVE_CLASS } from './NavRedux';
import { CLEAR_LOGIN_ACTIONS , CHANGE_SELECT_LANG} from '../views/LoginRedux';

//工具函数         
import { formatStr, _LocalStorage, times, setPrecision , createdSymbol} from '../utils/index';

//api
import { getNotice } from '../api/home';
import { loginOut } from '../api/regist';
import $ from 'jquery';
 //css
import './Nav.scss';





/* 
<nav id="nav">
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/trade">Trade</NavLink>
            </nav>
*/
class Nav extends React.Component {
    
   constructor(props) {
       super(props);
       this.state = {
			 notice: [],
             lock:false,
             curLang:'zh_CN'
        }
   }

   componentDidMount() {
        this.getNotice();
        const ls = new _LocalStorage();
        if(ls.get('lang')) {
            this.setState({
                curLang:ls.get('lang')
            })
        }

      /*   if(this.props.history.pathname !== '/' || this.props.history.pathname !== '/ex' || this.props.history.pathname !== '/ex/') {
            this.hiddNotify()
        } */
   }

   //退出登录
    loginOut = async () => {
		if(this.lock) return;

		this.setState({
			lock:true
        })
     
		const res = await loginOut(); 
		if(res.status === 1)  {
			Message.success(res.msg);
            this.props.dispatch(CLEAR_LOGIN_ACTIONS());
            window.location.reload();
		} else Message.error(res.msg);

            this.setState({
                lock:false
            })
    }

    //跳转
    redirect = (path) => {
        return () => {
            
           this.props.history.push(path);
        }
    }
    //选择语言
    langChange = (e) => {
        e.stopPropagation();
        $('.lang-ifont').addClass('langhove')
        this.refs.langMenu.getElementsByClassName('select-lang-wrap')[0].style.opacity="1";
        this.refs.langMenu.getElementsByClassName('select-lang-wrap')[0].style.display="block";
        this.refs.langMenu.getElementsByClassName('select-lang-wrap')[0].style.zIndex="888";
       
    }

    langLive = (e) => {
        e.stopPropagation();
        
        $('.lang-ifont').removeClass('langhove')
        this.refs.langMenu.getElementsByClassName('select-lang-wrap')[0].style.opacity="0";
        this.refs.langMenu.getElementsByClassName('select-lang-wrap')[0].style.display="none";
        this.refs.langMenu.getElementsByClassName('select-lang-wrap')[0].style.zIndex="-888";
      
    }
   
    //点击导航 添加class
    addClassName = () => {
        this.props.dispatch(ACTION_IS_ADD_CLASS());
	}
	
    //移除导航的class
    removeClass = () => {
        this.props.dispatch(ACTION_IS_REMOVE_CLASS());
	}
	
    //隐藏广播
    hiddNotify = () => {
        
        this.props.dispatch(ACTION_IS_HIDE_NOTIFY());
    }


    //获取公告
    getNotice = async () => {
        const res = await getNotice();

        if(res.status === 1) {
            this.setState({
                notice: res.data
            })

        } else {
			console.log(res);
		}
        
    }

     
    //计算汇率
    calculateEX = () => {
      
        const ls = new _LocalStorage();
        var exRate = 1;
        const hdData = ls.get('rate');
        const usrInfo = this.props.login.assets;
       // if(!_Map.isMap(hdData.exRate))  
      
        if(!usrInfo) return (createdSymbol(ls.get('lang'))+'0');
      
        if(ls.get('lang')) {
          
            exRate = hdData[ls.get('lang')]?hdData[(ls.get('lang'))]:hdData['BTC'];
           
        } else {
            
            //默认语言
            exRate =  hdData['zh_CN'];
          
        }
        
        const val = String(setPrecision(times(times(hdData['BTC'], usrInfo), ls.get('lang') === 'en_US'? 1: exRate)))
        if(val.indexOf('.') > -1  && val.split('.')[1] && val.split('.')[1].length >= 4) {
                const a = val.split('.');
                return (createdSymbol(ls.get('lang')) + a[0]+'.'+a[1].slice(0, 4))
        } else {
            return (createdSymbol(ls.get('lang')) + val)
        }
        
      // return  (this.createdSymbol(ls.get('lang').lang) + times(times(hdData['BTC'], usrInfo.amount), exRate?exRate:1))
        
    }

    selecLang = (lang) => {
        const ls = new _LocalStorage();
        ls.set('lang', lang);
        window.location.reload(true);   

        this.props.dispatch(CHANGE_SELECT_LANG(lang));
      //  this.props.selectLang(lang); 
        this.setState({
            curLang:lang
        });
    }

    render() {
        const { usrInfo,assets  } = this.props.login;
        
        const ls=new _LocalStorage();
      
        let style;
        let addNavClass;
        if(window.location.pathname !== '/' && window.location.pathname !== '/ex/'  && window.location.pathname !== '/ex' && window.location.pathname !== '/ex/activity'&& window.location.pathname !== '/ex/myInviteNew') {
             style = {position:'relative'};
             addNavClass = true;
        } else {
            style =  {position:'absolute'};
            addNavClass = false;
        }
      
       /* 用户信息Pop层 */
       const title = (
                        <div className="pop-usr-top">
                        <img src={require('./../assets/01_02.portrait02.png')} alt='' width="28" height="28"/>
                              <p className="username">{formatStr(usrInfo.username)}</p>
                              <p>ID：{usrInfo.id}</p>
                        </div>
                    );
       const content = (
                            <div className="pop-usr-body">
                                <Link to="/personal" className="pop-usr-body-top">
                                    <span>{intl.get("账户信息")}</span>
                                    <Icon type="right" />
                                </Link>
                                <Link to="/assets" className="pop-usr-body-bottom">
                                    <span>{intl.get("资产信息")}</span>
                                    <div className="pop-usr-body-assets">
                                        {/* <div>
                                            <p>{assets} BTC</p>
                                            <p>( {this.calculateEX()} )</p>
                                        </div> */}
                                        <Icon type="right" />
                                    </div>
                                </Link>
                                <div className="login-out" onClick={this.loginOut}>{intl.get("退出")}</div>
                            </div>
                        );
         

        return(
                    <header 
                        id="header" 
                        className={addNavClass ?'isAddClass':''} 
                        style={style}
                    >
                        <div className ={ cs("inform-wrap",  {'hideNotify':this.props.isHideNotify})} >
                            {
                                this.state.notice ?
                                <div className={cs("inform clearfix")}>
                                    <div className="inform-l">
                                        <i className="inform-icon"></i>
                                        <Carousel 
                                            className="notify"
                                            autoplay
                                            dots={false}
                                            easing="ease-in-out"
                                            vertical
                                        >
                                    {
                                        this.state.notice.map( (item, index) => (<div key={Math.random().toString(36)} onClick={this.redirect('/news')}>{item.title}</div>))
                                    }
                                    </Carousel>
                                </div>
                                <Icon type="close" onClick={this.hiddNotify} />
                            </div> : null
							}
                        </div>
                        <nav className="header-nav">
                           
                            <div className="nav-left">
                                <NavLink className="logo" to="/" exact onClick={this.removeClass} />
                             
                                    <NavLink to="/" onClick={this.removeClass} 
                                                exact className="animated nav-name" 
                                                activeClassName="nav-active"
                                    >{intl.get('首页')}</NavLink>
                                <NavLink 
                                        to="/trade"  
                                        className="animated  nav-name "  
                                        activeClassName="nav-active" 
                                        onClick={this.addClassName}
                                        onMouseOver={()=>{
                                          
                                        }}
                                >
                                    {intl.get('交易')}
                                </NavLink>
                                <NavLink
                                to={{pathname:"/news"}}
                                    exact
                                    onClick={this.addClassName} 
                                    className=" animated  nav-name" 
                                    activeClassName="nav-active">{intl.get('资讯')}</NavLink>
                               {/*  <NavLink 
                                    to="/activity"
                                    exact
                                    onClick={this.removeClass}  
                                    className={cs("animated  nav-name")}
                                    activeClassName="nav-active">福利</NavLink> */}
                                <NavLink
                                         to="/assets"
                                         className="animated  nav-name" 
                                         activeClassName="nav-active" 
                                         exact onClick={this.addClassName}>{intl.get('钱包')}
                                </NavLink>
                                <NavLink 
                                    to="/invited"
                                    exact
                                    onClick={this.removeClass}  
                                    className={cs("animated  nav-name")}
                                    activeClassName="nav-active">{intl.get('邀请')}</NavLink> 
                            </div>
                            <div className="nav-right">
                                {
                                    !this.props.login.loginState?<div className="nav-user-info" >
                                                        <NavLink activeClassName="nav-active"  className="nav-name last-btn"    to='/login' >{intl.get("登录")}</NavLink>
                                                        
                                                        <NavLink activeClassName="nav-active" className="nav-name" to='/register'>{intl.get("注册")}</NavLink>
                                                        </div>
                                                        :<div className="nav-user-login">
                                                            <NavLink
                                                                     to="/delegate"
                                                                     className="animated  nav-name" 
                                                                     activeClassName="nav-active" 
                                                                     exact 
                                                                     onClick={this.addClassName} 
                                                            >{intl.get('委托管理')}
                                                            </NavLink>
                                                            <NavLink
                                                                     to="/"
                                                                     className="animated  nav-name" 
                                                                     activeClassName="nav-active" 
                                                                     exact onClick={this.addClassName} 
                                                            >{intl.get('提交工单')}
                                                            </NavLink>
                                                            <div className="user-info-wrap">
                                                                <Popover content={content} title={title}>
                                                                    <img src={require('./../assets/01_02.portrait01.png')} alt='' width="18" height="18" style={{marginRight:'8px'}}/>
                                                                    <span style={{verticalAlign:'middle'}}>{formatStr(usrInfo.username)}</span>
                                                                    <i className="iconfont icon-sanJ-small">&#xe791;</i>
                                                                </Popover>
                                                            </div>
                                                        </div>
                                }
                              
                              
                                <div
                                    //style={{paddingTop:10}} 
                                    defaultValue="zh"  
                                    className="lang" 
                                    onMouseEnter={ (e) => this.langChange(e)} 
                                    onMouseLeave={ (e) => this.langLive(e)}
                                   ref="langMenu" 
                                >
                                    <div className="cur-lang-wrap" 
                                          
                                    >
                                        <i className={cs('lang-icon', this.state.curLang)}></i>
                                        <i className="lang-ifont iconfont icon-sanJ-small">&#xe791;</i>
                                    </div>
                                    <div className="select-lang-wrap">
                                        <div className="lang-list"  onClick={(e) => this.selecLang('zh_CN')}>
                                            <i className="lang-icon zh_CN"></i>
                                            <span>简体中文</span>
                                        </div>
                                        <div className="lang-list" onClick={(e) => this.selecLang('en_US')}>
                                            <i className="lang-icon en_US"></i>
                                            <span>English</span>
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                        </nav>
                    </header>
               
        )
    }
}

export default connect(state => {

    
    return {
        isAddClass: state.nav.isAddClass,
        isHideNotify:state.nav.isHideNotify,
        login:state.login
    }

}, undefined, undefined,{pure:false})(withRouter(Nav));