import React from 'react'
import { Provider} from 'react-redux'
import store from './redux/store'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
// import LandingPage from './components/landingPage-LoggedOut/LandingPage'
import Home from './pages/Home'
import Login from './components/loginPage/Login'
import Register from './components/registerPage/Register'
import FlashMessage from './components/flashMessage/FlashMessage'
import { IsUserRedirect } from './helpers/routes'

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<FlashMessage />
				<Switch>
					<IsUserRedirect exact loggedInPath={'/'} path={'/login'}>
						<Login />
					</IsUserRedirect>
					<IsUserRedirect exact loggedInPath={'/'} path={'/register'}>
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
