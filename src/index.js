import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//import registerServiceWorker from './registerServiceWorker';
import moment from 'moment';
import 'animate.css';
import './index.scss';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();
