/* 
    reducers 汇总
*/
import { combineReducers } from 'redux';
import home from '../views/HomeRedux';
import nav from '../layouts/NavRedux';
import personal from '../views/Personal/PersonalRedux';
import assets from '../views/AssetsRedux';
import trade from '../views/TradeRedux';
import login from '../views/LoginRedux'
export default combineReducers({
    home,
    nav,
    personal,
    assets,
    trade,
    login
});