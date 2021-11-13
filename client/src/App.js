import React, {Fragment} from 'react'
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login'
import Register from './pages/Register'



const App = () => {
  return (
    <Provider store = {store}>
    <Router>
      <Fragment>
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

      </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
