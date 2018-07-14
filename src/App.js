import React, { Component } from 'react';
import { BrowserRouter  } from 'react-router-dom';
import store from './redux/configureStore';
import { Provider } from 'react-redux';
import './assets/iconfont/iconfont.css'

import Frames from './layouts/Frames';

import './App.css';
class App extends Component {
	
	render() {

		return(
				<Provider store = {store}>
					<BrowserRouter basename="/ex">
						<Frames  />
					</BrowserRouter>
				</Provider>
		)
	}

}

export default App;
