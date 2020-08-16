import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
      !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
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
