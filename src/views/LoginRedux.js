
import { put, take, call, fork } from 'redux-saga/effects';
import { loginUrl } from '../api/regist.js';
import { message } from 'antd';
import { _LocalStorage } from '../utils/index';

import { GetUserAsset } from '../api/funds';

const FETCH_LOGIN = 'FETCH_LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const CLEAR_LOGIN = 'CLEAR_LOGIN';
const UN_VISIABLE = 'UN_VISIABLE';
const CHANGE_LANG = "CHANGE_LANG";
const CHANGE_ASSSETS = 'CHANGE_ASSSETS';
const CHANGE_ASSETS_SUCCESS = 'CHANGE_ASSETS_SUCCESS';


//登录
export function* fetchLogin(action) {
    const data = yield call(loginUrl.bind(this), {userMember: action.data }); //指示中间件调用fetch异步
    yield put ({type:LOGIN_SUCCESS, data}); //发起一个action到store
}


//watch saga 监听被dispatch的action,当收到action或者知道其被触发，调用work saga执行任务
export function* watchFecthLogin(action) {
    while(true) {
         const data = yield take(FETCH_LOGIN); //指示中间件等待Store上指定的action,即监听action
        
         yield fork(fetchLogin, data) ;//指示中间件以无阻塞的方式调用fetchTabs
    }
}

export function lOGIN_SUCCESS(data) {
   
    return {
        type: LOGIN_SUCCESS,
        data
    }
}

export function FETCH_LOGIN_ACTIONS (data, history) {
   
    return {
        type:FETCH_LOGIN,
        data,
        history
    }
}


//登录失效 清除登录状态
export function CLEAR_LOGIN_ACTIONS( data ) {

    return {
        type: CLEAR_LOGIN
    }
}
// 弹框消失
export function UN_VISIABLE_ACTION ( data ) {
    return {
        type : UN_VISIABLE
    }
}

//切换语言
export function CHANGE_SELECT_LANG (data) {
    return {
        type:CHANGE_LANG,
        data
    }
}


//获取资产
export function* fetchAssets(action) {
    const data = yield call(GetUserAsset.bind(this)); //指示中间件调用fetch异步
    yield put ({type:CHANGE_ASSETS_SUCCESS, data}); //发起一个action到store
}


//watch saga 监听被dispatch的action,当收到action或者知道其被触发，调用work saga执行任务
export function* watchFetchAssets(action) {
    while(true) {
         const data = yield take(CHANGE_ASSSETS); //指示中间件等待Store上指定的action,即监听action
         yield fork(fetchAssets, data) ;//指示中间件以无阻塞的方式调用fetchTabs
    }
}

//更改资产信息
export function CHANGE_ASSETS_ACTION(){
    return {
        type: CHANGE_ASSSETS
    }
    
}

const ls = new _LocalStorage();
const initState = {
    loginState:ls.get('login')?ls.get('login').loginState :false,
    loginMessage:'',
    bool:false,
    usrInfo: ls.get('usrInfo')?ls.get('usrInfo'):{},
    assets:ls.get('usrInfo')?ls.get('usrInfo').amount:0,
    visible:false,
    lang:ls.get('lang')?ls.get('lang'):'zh_CN',
    token:'',
    id:ls.get('usrId')?ls.get('usrId'):'',
    validateType:'',
    history:'' //路由
};

const SAVE_LOGIN = "SAVE_LOGIN";
export function EMIT_SAVE_LOGIN(data) {
    return {
        type:SAVE_LOGIN,
        data
    }
}
/* 
    reducer,触发action 类型
*/
export default function login(state = initState, action) {
    switch(action.type) {
        
        case FETCH_LOGIN: {
            return {
                ...state,
                bool:true,
                from:action.data.from,
                history:action.history
            }
        }
        //保存二次登陆后用户信息
        case SAVE_LOGIN: {

          if(action.data.status === 1) {
                setTimeout(() => {
                    state.history.push('/');
                }, 2000);
                ls.set('login', {loginState:true});
                
                    const usrInfo = {
                            id: action.data.data.id,
                            amount:action.data.data.amount,
                            username: action.data.data.username,
                            token:action.data.data.token
                    };

                ls.set('usrInfo', usrInfo);
                return {
                    ...state,
                    id:action.data.data.id,
                    validateType:action.data.data.validateType,
                    loginState: true,
                    bool:false,
                    usrInfo:  usrInfo,
                }
          }
          else {
              return {
                  ...state
              }
          }
        }
        case LOGIN_SUCCESS: {
          
           if(action.data.status === 1) {
                message.success(action.data.msg, 2);
                
                //set localstroage
                ls.set('login', {loginState:true});
               
                const usrInfo = {
                        id: action.data.data.id,
                        amount:action.data.data.amount,
                        username: action.data.data.username,
                        token:action.data.data.token
                };

                ls.set('usrInfo', usrInfo)
             
                setTimeout(() => {
                    state.history.push('/');
                }, 2000);

                return {
                   ...state,
                   loginState: true,
                   bool:false,
                   usrInfo:  usrInfo,
                   visible:false  
               }
              
              
           } else if(action.data.status === 90008){
            return {
                ...state, 
                loginState: false,
                bool:false,
                visible:true 
            };
           } else if( action.data.status === 90042) {

                setTimeout(() => {
                    state.history.push(`/valid?type=${action.data.data.validateType}&token=${action.data.data.token}`)
                }) 
            ls.set('usrId', action.data.data.id);
               return {
                   ...state,
                   token:action.data.data.token,
                   id:action.data.data.id,
                   validateType:action.data.data.validateType
               }

               
           }
           
           else{
              message.error(action.data.msg, 2);
               return {
                   ...state, 
                   loginState: false,
                   bool:false,
                   visible:false
               }
           }
          
        }
        case UN_VISIABLE: {
            return{
                ...state, 
                visible: false
            }
        }
        case CHANGE_ASSETS_SUCCESS:{
            if(action.data.status === 1) {
                return{
                    ...state, 
                    assets: action.data
                }
            }else{
                return{
                    ...state
                }
            }

        }
        case CLEAR_LOGIN: {
            ls.clear('login');
            ls.clear('usrInfo');
            ls.clear('usrId')
            return {
                ...state, 
                loginState: false
            }
        }

        //切换语言
        case CHANGE_LANG: {
            return {
                ...state,
                lang:action.data
            }
        }
        default:
            return state;
    }
}