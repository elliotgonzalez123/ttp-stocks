import React, { Fragment, useEffect } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Transactions from './components/dashboard/Transactions';
import PrivateRoute from './components/routing/PrivateRoute';
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import store from './store';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//checks LS for JW token, passes it to util function which sets it to a custom header
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  //keep suser logged in as long as token is valid
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/transactions"
                component={Transactions}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
