/* 
    app路由配置文件
*/

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import PrivateRoute from '../components/shared/PrivateRoute';
import { Spin } from 'antd';
import {connect} from 'react-redux';
/* import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; 
import AsyncSiteContent from  '../views/SiteContent';*/
const Loading = (props) => { 
    if (props.error) {
        return <div>出错啦，请刷新页面</div>;
      } else if (props.pastDelay) {
       
        return <div style={{textAlign:'center', paddingTop:200, height:500,paddingBottom:200}}><Spin /></div>
      } else { 
      
        return null;
    }    
};

//主页
const AsyncHome = Loadable({
    loader:()=> import('../views/Home'),
    loading: Loading,
     delay: 200, 
});

//交易页
const AsyncTrade = Loadable({
    loader:()=>import('../views/Trade'),
    loading: Loading,
     delay: 200, 
});

const AsyncCoin = Loadable({
    loader:()=>import('../views/Coin'),
    loading: Loading,
     delay: 200, 
});
const AsyncTrustManagemant = Loadable({
    loader:()=>import('../views/TrustManagemant'),
    loading: Loading,
     delay: 200, 
});

//个人中心
const AsyncPersonal = Loadable({
    loader:()=>import('../views/Personal/Personal'),
    loading: Loading,
     delay: 200, 
});
// 邀请页面
const AsyncMyInviteNew = Loadable({
    loader:()=>import('../views/Personal/MyInviteNew'),
    loading: Loading,
     delay: 200, 
});

//修改密码
const AsyncChangePassword = Loadable({
    loader:()=>import('../views/Personal/subpage/ChangePassword'),
    loading: Loading,
     delay: 200, 
});

//关闭短信验证
const AsyncClosePhone = Loadable({
    loader:()=>import('../views/Personal/subpage/ClosePhone'),
    loading: Loading,
     delay: 200, 
});

//修改手机号码
const UpdatePhone  = Loadable({
    loader:()=>import('../views/Personal/subpage/updatePhone'),
    loading: Loading,
     delay: 200, 
});

//关闭短信验证
const CloseGoogle = Loadable({
    loader:()=>import('../views/Personal/subpage/CloseGoogle'),
    loading: Loading,
     delay: 200, 
});

//绑定电话
const AsyncBindPhoneNumber = Loadable({
    loader:()=>import('../views/Personal/subpage/BindPhoneNumber'),
    loading: Loading,
     delay: 200, 
});
const AsyncAccountCheck = Loadable({
    loader:()=>import('../views/Personal/subpage/AccountCheck'),
    loading: Loading,
    delay: 200, 
});
const AsyncGoogleCheck = Loadable({
    loader:()=>import('../views/Personal/subpage/GoogleCheck'),
    loading: Loading,
     delay: 200, 
});

const AsyncSiteContent = Loadable({
    loader:()=>import('../views/SiteContent'),
    loading: Loading,
     delay: 200, 
});

//
const AsyncAssets = Loadable({
    loader:()=>import('../views/Assets'),
    loading: Loading,
     delay: 200, 
});

//资讯页面
const AsyncNews = Loadable({
    loader:()=>import('../views/News'),
    loading: Loading,
     delay: 200, 
    
});

//福利页面
const AsyncWeal = Loadable({
    loader:()=>import('../views/Weal'),
    loading: Loading,
     delay: 200, 
});

//资讯详情页面 
const AsyncNews_details = Loadable({
    loader:()=>import('../views/News_details'),
    loading: Loading,
     delay: 200, 
});

//专业K线交易页面
const AsyncKlineTrade = Loadable({
    loader:()=>import('../views/KlineTrade'),
    loading:Loading,
    delay:200
})

//登录页面
const Login = Loadable({
    loader:()=>import('../views/Login'),
    loading:Loading,
    delay:200
})
//注册页面
const Regiester = Loadable({
    loader:()=>import('../views/Regiester'),
    loading:Loading,
    delay:200
})
//注册成功页面
const RegiesterSucess = Loadable({
    loader:()=>import('../views/RegiesterSucess'),
    loading:Loading,
    delay:200
})
//忘记密码页面
const ForgetPass = Loadable({
    loader:()=>import('../views/ForgetPass'),
    loading:Loading,
    delay:200
})
//忘记密码页面的下一个页面
const Rechangepassword = Loadable({
    loader:()=>import('../views/RechangePassword'),
    loading:Loading,
    delay:200
})

//忘记密码页面的下一个页面
const AginValid = Loadable({
    loader:()=>import('../views/AginValid'),
    loading:Loading,
    delay:200
})

// http://coinex8.com/.well-known/pki-validation/fileauth.txt
const Fileauth = Loadable({
    loader:()=>import('../views/Fileauth'),
    loading:Loading,
    delay:200
})


const MyRouter = (props) => (
            
               
                <Switch location={props.location}  >
                    <Route path="/" component={AsyncHome} exact loginState={props.loginState}></Route>
                    <Route path="/ex" component={AsyncHome} exact loginState={props.loginState}></Route>
                    <Route path="/trade"   component={AsyncTrade} ></Route>
                    <Route path="/klineTrade"  component={AsyncKlineTrade}></Route>
                    <Route path="/Coin"  component={AsyncCoin}></Route>
                    <PrivateRoute path="/delegate"  component={AsyncTrustManagemant} loginState={props.loginState}></PrivateRoute>
                    <Route path="/news/:target?" component={AsyncNews} ></Route>
                    <Route path="/neaws_details" component={AsyncNews_details} ></Route>
                    <PrivateRoute path="/activity"  component={AsyncWeal} loginState={props.loginState}></PrivateRoute>
                    <PrivateRoute path="/personal"  component={AsyncPersonal} loginState={props.loginState}></PrivateRoute>
                    <Route path="/invited" component={AsyncMyInviteNew}></Route>
                    <PrivateRoute path="/changepassword"  component={AsyncChangePassword} loginState={props.loginState}></PrivateRoute>
                    <PrivateRoute path="/closephone"  component={AsyncClosePhone} loginState={props.loginState}></PrivateRoute>
                    <PrivateRoute path="/updatePhone"  component={UpdatePhone} loginState={props.loginState}></PrivateRoute>
                    <PrivateRoute path="/closeGoogle"  component={CloseGoogle} loginState={props.loginState}></PrivateRoute>
                    <PrivateRoute path="/bindphonenum"  component={AsyncBindPhoneNumber} loginState={props.loginState}></PrivateRoute>
                    <PrivateRoute path="/accountcheck"  component={AsyncAccountCheck} loginState={props.loginState}></PrivateRoute>
                    <PrivateRoute path="/googlecheck"  component={AsyncGoogleCheck} loginState={props.loginState}></PrivateRoute>
                    <Route path="/site" component={AsyncSiteContent}></Route>
                    <PrivateRoute path="/assets" component={AsyncAssets}  loginState={props.loginState}></PrivateRoute>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Regiester} ></Route>
                    <Route path="/registerSucess" component={RegiesterSucess}></Route>
                    <Route path="/forgetPass" component={ForgetPass}></Route>
                    <Route path="/rechangepassword" component={Rechangepassword}></Route>
                    <Route path="/valid" component={AginValid}  ></Route>
                    <Route path="/.well-known/pki-validation/fileauth.txt" component={Fileauth}  ></Route>
                    <Redirect to="/" />
                </Switch>

            );

const mapStateToprops = (state) => {

    return {
        loginState: state.login.loginState
    }
}
export default connect(mapStateToprops,undefined, undefined, {pure:false})(MyRouter);