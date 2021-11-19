import React from 'react'
import axios from 'axios'
import { Provider} from 'react-redux'
import store from './redux/store'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'

// import LandingPage from './components/landingPage-LoggedOut/LandingPage'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import FlashMessage from './components/flashMessage/FlashMessage'
<<<<<<< HEAD
import CreateEvent from './components/landingPage/CreateEvent'
=======
import { IsUserRedirect } from './helpers/routes'
axios.defaults.baseURL = 'http://localhost:8000';
>>>>>>> 2412b0f5a39603766b243d9cc49b55d3bcb12e65

const App = () => {
	return (
    <Provider store={store}>
			<Router>
				<FlashMessage />
				<Switch>
<<<<<<< HEAD
					<Route exact path="/createEvent">
						<CreateEvent />
					</Route>
					<Route exact path="/login">
=======
					<IsUserRedirect exact loggedInPath={'/'} path={'/login'}>
>>>>>>> 2412b0f5a39603766b243d9cc49b55d3bcb12e65
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
