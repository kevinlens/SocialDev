import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import PrivateRoute from './components/routing/PrivateRoute';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
//For more info look up this from your Q&A: Why is 'loading' of the initalState never set to 'true'?
/*Upon the very FIRST page load on ANY route,(but more specifically the landing/login page), this check to see if
the user is authenticated(by checking the localStorage for token and sending to database) and immediately after that set the 'loading'
to false. This is important because if you were to refresh the page, the 'loadUser' dispatch will need 
enough time to fetch data from the database and then start setting the isAuthenticated to 'true' or 'false' and also loading to 'false'.
Because while it is fetching data, the PrivateRoute middleware is already running AND reading the global state, which
already has the isAuthenticated set to 'null' which would supposedly take the user to the login page, but because we also have the
loading set to 'true' by default almost everytime the pages FIRST load/refreshes, the PrivateRoute middleware would not be able to
assume that the user is not Authenticated (sending us to the login page, and then back to dashboard after the fetch data is finished) 
just because the fetch data hasn't finished yet and confirmed it. Therefore the 'loading' that we have set to 'true' once,
is very essential*/
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          {/* The background */}
          <Route exact path="/" component={Landing} />
          <section className="container">
            {/* this alert(warning) should show on every page when there is an error */}
            <Alert />
            {/* Switch is there because you want it to only execute a route upon specific url slash */}
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
};

export default App;
