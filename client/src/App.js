import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

import Routes from './components/routing/Routes';

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

          <Switch>
            {/* The background */}
            {/*We are giving this landing page route a seprate route component because the Page Not Found component
            would exist below it if we didnt seperate it from the '/' path */}
            <Route exact path="/" component={Landing} />

            <Route component={Routes} />
          </Switch>
        </>
      </Router>
    </Provider>
  );
};

export default App;
