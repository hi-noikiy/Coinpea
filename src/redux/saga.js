

import {fork} from 'redux-saga/effects';

import { watchFecthTabs } from '../components/home/HomeTabsListRedux.js';
import { watchFecthAssets } from '../components/assets/FundsRedux';
import { watchFecthAllcoin } from '../components/assets/GetallCoinRedux';
import { watchFecthLogin,watchFetchAssets } from '../views/LoginRedux.js';

export default function* rootSaga() {
    yield [
            fork(watchFetchAssets),
            fork(watchFecthTabs),
            fork(watchFecthAssets),
            fork(watchFecthAllcoin),
            fork(watchFecthLogin)
    ];
}