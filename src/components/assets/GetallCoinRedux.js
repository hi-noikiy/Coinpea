
/*
    币种信息redux
*/
import { GetAllCoin } from '../../api/funds';
import { put, take, call, fork } from 'redux-saga/effects';


const GET_ALLCOIN = 'GET_ASSETS_LIST';
const SET_ACTIVEID = 'SET_ACTIVEID';
const GET_ALLCOIN_SUCCESS = 'GET_ASSETS_LIST_SUCCESS';

//action 
export function getAllCoinSuccess(data) {
    return {
        type: GET_ALLCOIN_SUCCESS,
        payload:data
    }
}

export function getAllCoin() {
    return {
        type: GET_ALLCOIN
    }
}


export function setActiveCoinId(id, name, count, freeze, useable, icoinUrl, smCount){
    return {
        type: SET_ACTIVEID,
        id: id,
        name:name,
        count:count,
        freeze:freeze,
        useable:useable,
        icoinUrl:icoinUrl,
        smCount:smCount
    }
}


//work saga 
export function* fecthAllcoin(action) {

    const data = yield call(GetAllCoin.bind(this)); //指示中间件调用fetch异步
    yield put ({type:GET_ALLCOIN_SUCCESS, data}) //发起一个action到store
}

//watch saga 监听被dispatch的action,当收到action或者知道其被触发，调用work saga执行任务
export function* watchFecthAllcoin() {
  
    while(true) {
         yield take(GET_ALLCOIN); //指示中间件等待Store上指定的action,即监听action
         yield fork(fecthAllcoin) ;//指示中间件以无阻塞的方式调用fetchTabs
    }
}

//reducer
const initialState = {
    coinList:[],
    activeCoinid:1,
    activeCoinName:"",
    count: "",
    freeze: "",
    useable: "",
    icoinUrl:'',
    
}


export default function GetallCoin(state = initialState, action) {
    switch(action.type){
        //获取充值列表
        case GET_ALLCOIN_SUCCESS:
            return {
                ...state,
                coinList:action.data.data,
                activeCoinid:state.activeCoinid?state.activeCoinid:action.data.data[0].id,
                icoinUrl: state.icoinUrl?state.icoinUrl:action.data.data[0].icoinUrl,
                activeCoinName: state.activeCoinName?state.activeCoinName:action.data.data[0].sortName,  
            }
        //选中充值币中
        case SET_ACTIVEID:
            return {
                ...state,
                activeCoinid: action.id,
                activeCoinName: action.name.toUpperCase(),
                count:action.count,
                freeze:action.freeze,
                useable: action.useable,
                icoinUrl:action.icoinUrl,
            }

        default:
            return state
    }
}