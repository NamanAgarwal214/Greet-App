import React from 'react'
import axios from 'axios'
import { Provider} from 'react-redux'
import store from './redux/store'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import FlashMessage from './components/flashMessage/FlashMessage'
import CreateEvent from './components/createEvent/CreateEvent'
import { IsUserRedirect } from './helpers/routes'
axios.defaults.baseURL = 'http://localhost:8000';

const App = () => {
	return (
    <Provider store={store}>
			<Router>
				<FlashMessage />
				<Switch>
					{/* <Route exact path="/createEvent">
						<CreateEvent />
					</Route> */}
					<IsUserRedirect exact loggedInPath={'/'} path={'/login'}>
						<Login />
					</IsUserRedirect>
					<IsUserRedirect exact loggedInPath={'/'} path={'/signup'}>
						<Register />
					</IsUserRedirect>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</Router>
		</Provider>
	)
}

export default App
