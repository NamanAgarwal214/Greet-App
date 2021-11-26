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
import { IsUserRedirect } from './helpers/routes';
import ProfilePage from './pages/Profile';
axios.defaults.baseURL = 'http://localhost:8000';

function App() {
	const initialState = {
		loggedIn: Boolean(localStorage.getItem('greetToken')),
		flashMessages: [],
    hasphotoUrl: Boolean(localStorage.getItem('greetUserPhoto')),
		user: {
			token: localStorage.getItem('greetToken'),
			username: localStorage.getItem('greetUserName'),
			email: localStorage.getItem('greetEmail')
		},
    photoUrl: localStorage.getItem('greetUserPhoto')
	};

	function ourReducer(draft, action) {
		switch (action.type) {
			case 'login':
				draft.loggedIn = true;
				draft.user = action.data;
				return;
			case 'logout':
				draft.loggedIn = false;
				return;
			case 'photoChange':
				draft.hasphotoUrl = true;
        draft.photoUrl = action.value
				return;
			case 'flashMessage':
				draft.flashMessages.push({
					message: action.value,
					status: action.status
				});
				return;
			default:
				return;
		}
	}

	const [state, dispatch] = useImmerReducer(ourReducer, initialState);

	useEffect(() => {
		if (state.loggedIn) {
			localStorage.setItem('greetToken', state.user.token);
			localStorage.setItem('greetUsername', state.user.username);
			localStorage.setItem('greetEmail', state.user.email);
		} else {
			localStorage.removeItem('greetToken');
			localStorage.removeItem('greetUsername');
			localStorage.removeItem('greetEmail');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.loggedIn]);

  useEffect(() => {
		if (state.hasphotoUrl) {
			localStorage.setItem('greetUserPhoto', state.photoUrl);
		} else {
			localStorage.removeItem('greetUserPhoto');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.hasphotoUrl]);

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<Router>
					<FlashMessage flashMessages={state.flashMessages} />
					<Switch>
						<Route exact path="/create-event">
							<CreateEvent />
						</Route>
						<IsUserRedirect exact loggedIn={state.loggedIn} loggedInPath={'/'} path={'/login'}>
							<Login />
						</IsUserRedirect>
						<IsUserRedirect exact loggedIn={state.loggedIn} loggedInPath={'/'} path={'/signup'}>
							<Register />
						</IsUserRedirect>
						<IsUserRedirect exact loggedIn={state.loggedIn} loggedInPath={'/'} path={'/profile'}>
							<ProfilePage />
						</IsUserRedirect>
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
