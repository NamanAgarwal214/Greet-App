import React, { useEffect } from 'react';
import axios from 'axios';
import { useImmerReducer } from 'use-immer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import StateContext from './context/StateContext';
import DispatchContext from './context/DispatchContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import FlashMessage from './components/flashMessage/FlashMessage';
import CreateEvent from './components/createEvent/CreateEvent';
import EventList from './components/eventList/EventList'
import { IsUserRedirect } from './helpers/routes';
import ProfilePage from './pages/Profile';
axios.defaults.baseURL = 'http://localhost:8000';

function App() {
	const initialState = {
		loggedIn: Boolean(localStorage.getItem('GreetToken')),
		flashMessages: [],
		token: localStorage.getItem('GreetToken'),
		user: {
			username: localStorage.getItem('GreetAppUsername'),
			email: localStorage.getItem('GreetAppEmail'),
			photo: localStorage.getItem('GreetAppPhoto')
		}
	};

	const initialState2 = {
  		occasion: null,
  		occasions: [],
  		error: {},
	};

	function ourReducer(draft, action) {
		switch (action.type) {
			case 'login':
				draft.loggedIn = true;
				draft.token = action.data;
				return;
			case 'logout':
				draft.loggedIn = false;
				return;
			case 'flashMessage':
				draft.flashMessages.push({
					message: action.value,
					status: action.status
				});
				return;
			case 'updateProfile':
				draft.user = action.value;
				return;
			default:
				return;
		}
	}

	function ourReducer2(draft, action) {
		switch (action.type){
			case 'GET_EVENTS':
				draft.occasions = action.payload;
				return;
			case 'ADD_EVENT':
				draft.occasions.push(action.payload);
				return;
			default:
				return;
		}
	}

	const [state, dispatch] = useImmerReducer(ourReducer, initialState);
	const [state2, dispatch2] = useImmerReducer(ourReducer2, initialState2);
	useEffect(() => {
		if (state.loggedIn) {
			localStorage.setItem('GreetToken', state.token);
		} else {
			localStorage.removeItem('GreetToken');
			localStorage.removeItem('GreetAppUsername');
			localStorage.removeItem('GreetAppEmail');
			localStorage.removeItem('GreetAppPhoto');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.loggedIn]);

	useEffect(() => {
		if (state.token) {
			axios
				.get('/api/user/getUser', {
					headers: {
						Authorization: `Bearer ${state.token}`
					}
				})
				.then(res => {
					state.user = res.data;
				})
				.catch(e => {
					console.log('There was an error');
				});
			localStorage.setItem('GreetAppUsername', state.user.username);
			localStorage.setItem('GreetAppEmail', state.user.email);
			localStorage.setItem('GreetAppPhoto', state.user.photo);
		} else {
			localStorage.removeItem('GreetAppUsername');
			localStorage.removeItem('GreetAppEmail');
			localStorage.removeItem('GreetAppPhoto');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.token, state.user]);

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<Router>
					<FlashMessage flashMessages={state.flashMessages} />
					<Switch>
						<Route exact path="/view-events">
							<EventList />
						</Route>
						<Route exact path="/create-event">
							<CreateEvent />
						</Route>
						<IsUserRedirect
							exact
							loggedIn={state.loggedIn}
							loggedInPath={'/'}
							path={'/login'}>
							<Login />
						</IsUserRedirect>
						<IsUserRedirect
							exact
							loggedIn={state.loggedIn}
							loggedInPath={'/'}
							path={'/signup'}>
							<Register />
						</IsUserRedirect>
						<Route path="/me" exact>
							<ProfilePage />
						</Route>
						<Route path="/">
							<Home />
						</Route>
					</Switch>
				</Router>
			</DispatchContext.Provider>
		</StateContext.Provider>
	);
}

export default App;
