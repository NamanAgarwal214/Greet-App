import React, {Fragment} from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login'
import Register from './pages/Register'


const App = () => {
  return (
    <Router>
      <Fragment>
          {/* <Navbar />
          <Route exact path="/" component={Home} />
        <Switch>
					<Route path="/register" component={Register} />
					<Route path="/login" component={Login} />
				</Switch> */}
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
  );
}

export default App;
