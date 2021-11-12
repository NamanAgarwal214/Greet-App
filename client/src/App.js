import React, {Fragment} from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Login from './components/Layout/auth/Login';
import Register from './components/Layout/auth/Register';
import Home from './components/Layout/Home';
import Navbar from './components/Layout/Navbar';


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
            <Navbar />
            <Home />
          </Route>
        </Switch>

      </Fragment>
    </Router>
  );
}

export default App;
