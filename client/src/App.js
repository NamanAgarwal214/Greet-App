import React from 'react'
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import LandingPage from './components/landingPage/LandingPage';
import Login from './components/loginPage/Login'
import Register from './components/registerPage/Register'



const App = () => {
  return (
    <Provider store = {store}>
    <Router>
        <Switch>
          <Route exact path = '/login'>
            <Login />
          </Route>
          <Route exact path = '/register'>
            <Register />
          </Route>
          <Route path = '/'>
            <LandingPage />
          </Route>
        </Switch>
    </Router>
    </Provider>
  );
}

export default App;
