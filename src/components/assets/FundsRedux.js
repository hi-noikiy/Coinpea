
/*
    用户资产信息redux
*/
import { GetUserAssetList } from '../../api/funds';
import { put, take, call, fork } from 'redux-saga/effects';

import { message } from 'antd';
import  { addTotal, times } from '../../utils/index';

const GET_ASSETSINFO_SUCCESS = 'GET_ASSETSINFO_SUCCESS';
const GET_ASSETSINFO = 'GET_ASSETSINFO';


//action 
export function GetAssetInfoSuccess(data) {
    return {
        type: GET_ASSETSINFO_SUCCESS,
        payload:data
    }
}

export function GetAssetInfo() {
    return {
        type: GET_ASSETSINFO
    }
}



//work saga 
export function* fecthAssets(action) {
    const data = yield call(GetUserAssetList.bind(this)); //指示中间件调用fetch异步
    yield put ({type:GET_ASSETSINFO_SUCCESS, data}) //发起一个action到store
}

//watch saga 监听被dispatch的action,当收到action或者知道其被触发，调用work saga执行任务
export function* watchFecthAssets() {
    while(true) {
         yield take(GET_ASSETSINFO); //指示中间件等待Store上指定的action,即监听action
         yield fork(fecthAssets) ;//指示中间件以无阻塞的方式调用fetchTabs
    }
}

//reducer
const initialState = {
    convert:0,
    totalBTC:0,
    userWithdraw:0,
    withdrawQuota:0,
    loading:true,
    data:[],
    srcData:[],
    search:'',
}

//隐藏小额资产
const HIDE_LOWER_ASSETS = 'HIDE_LOWER_ASSETS';
export function EMIT_HIDE_ASSETS(val,types, bool,search) {
    return {
        type: HIDE_LOWER_ASSETS,
        val,
        types,
        bool,
        search
    }
}
export default function Funds(state = initialState,action) {
    switch(action.type){
        case GET_ASSETSINFO_SUCCESS:
        if(action.data.status === 1) {
            action.data.data.forEach(item => {
                item.total = addTotal(item.frozen_fmt, item.total_fmt);
                item.valuation = times(addTotal(item.frozen_fmt, item.total_fmt), item.coinBasicInfoDo.lastDealPrize);
            })
            return {
                    ...state,
                    loading:false,
                    data:action.data.data,
                    srcData:action.data.data,
                }
        } else {
            message.error(action.data.msg);
            return {
                ...state,
                loading:false
            };
        }
        //隐藏资产及搜索
        case HIDE_LOWER_ASSETS:
        let newData = [];
        if(action.types === 'hide') {
            
            action.bool? newData = state.srcData.filter( item => {
                return item.total !== 0
            }) : newData =  state.srcData
         
            newData = [].concat(newData).filter(item => {
                return (item.coinBasicInfoDo.sortName.indexOf(String(action.search).toUpperCase()) >=0 ) // ||item.coinBasicInfoDo.englishName.indexOf(action.search) >=0
            })
          
        } else {
            newData = state.srcData.filter( item => {
                return (item.coinBasicInfoDo.sortName.indexOf(String(action.val).toUpperCase()) >=0 ) //||item.coinBasicInfoDo.englishName.indexOf(action.val) >=0 
            }) 
 
        }
        return {
            ...state,
            data:newData,
            search: action.search
        }
            
        default:
            return state;
    }
}