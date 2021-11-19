import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import LandingPage from './components/landingPage/LandingPage'
import Login from './components/loginPage/Login'
import Register from './components/registerPage/Register'
import FlashMessage from './components/flashMessage/FlashMessage'
import CreateEvent from './components/landingPage/CreateEvent'

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<FlashMessage />
				<Switch>
					<Route exact path="/createEvent">
						<CreateEvent />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/register">
						<Register />
					</Route>
					<Route path="/">
						<LandingPage />
					</Route>
				</Switch>
			</Router>
		</Provider>
	)
}

export default App
