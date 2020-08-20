import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

//destructure the 'component' and get whatever component is passed from the user into it
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  //'...rest' means taking anything else that is passed in and spreading it
  ...rest
}) => (
  <Route
    //'...rest' means taking anything else that is passed in and spreading it
    {...rest}
    render={(props) =>
      /*while loading is still 'true' upon refresh/load of page, display spinner. After fetch data from database, default 
      'isAuthenticated: null' is set to T/F and 'loading' to false, check data to see if user is authenticated or not, if not, redirect to login page */
      //'loading' provides time for fetching data, and is set to 'false' after its done.
      loading ? (
        <Spinner />
      ) : isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
      //
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

//access to global state 'initialState of reducers/auth'
const mapStateToProps = (state) => ({
  //to verify is it the correct owner
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
