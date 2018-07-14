import 'whatwg-fetch';
import { message } from 'antd';
import store  from '../redux/configureStore';
import { CLEAR_LOGIN_ACTIONS } from '../views/LoginRedux';
import {_LocalStorage} from '../utils/index';
import qs from 'querystring';

const ls = new _LocalStorage();

export  function _mAjax (url, option={}) {
  
    const params = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'lang': ls.get('lang')?ls.get('lang'):'zh_CN'
            },
            credentials: "same-origin",
            method: option.method || 'get',
           
        },
          method = option.method || 'get',
          data = option.data || '';
      
        //data['token'] = "ejilajfkfjaifwwjckdedklswe";
          switch(method) {
              case 'get':
              url = url + (data ? '?' +qs.stringify(data) : '');
              break;
              case 'post':
              params.body = JSON.stringify(data);
              break;
              default:
              return;
          }
        
    return fetch(url, params).then(callback).catch(errHandle);
}

function callback(res){
    //以后修改 根据response状态码全局弹出Toast信息
    return res.json().then( response =>{
       
        if(!response){
        
            throw new Error("服务器返回参数错误")
        
        } else if(response.status === 100000){
         
            new Promise((res, rej) => {
                
                // message.info('登录失效，请重新登录');
                store.dispatch(CLEAR_LOGIN_ACTIONS());
            }).then( res =>res);
            
            
        } else if(response.errcode === -1){
            
            return response
        
        }
           
            return response;
        
        })
        
}

//创建容错方法    
function errHandle(res){
   // message.error('网络出错，请重试！');
//   throw new Error(res);
    return {
        status: -1,
        msg:'网络出错，请重试！',
        res:res
    }

}