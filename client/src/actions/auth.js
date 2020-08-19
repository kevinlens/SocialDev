import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from './types';

import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/authenticateUser');
    //If you look at your react dev tools in 'Action' you can see the payload data sent out from just the function below
    //the 'action' payload now has the data that you work with in the reducers/auth.js folder/file
    //the 'type' is also set from the dispatch for the reducers/auth.js file to distinguish and read
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    //cause a change in the redux dev tool 'action' to which reducers/auth file is invoked
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// ======================================================================

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  //
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name,
    email,
    password,
  });
  //

  try {
    //
    const res = await axios.post('/api/users', body, config);
    //Send the data to react dev tool 'Action' tab
    dispatch({
      type: REGISTER_SUCCESS,
      //note: the 'payload: res.data' now has the token sent back from server to be used for verification
      payload: res.data,
    });

    dispatch(loadUser());
    //
  } catch (err) {
    //

    const errors = err.response.data.errors;

    if (errors) {
      //invoke the dispatch ACTION function 'setAlert'
      //for every error that exist in the array print out its messages in the pre-built component
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    //cause a change in the redux dev tool 'action' to which reducers/auth file is invoked
    dispatch({
      type: REGISTER_FAIL,
    });
    //
  }

  //
};

//========================================================================================

// Login User
export const login = (email, password) => async (dispatch) => {
  //
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    email,
    password,
  });
  //

  try {
    //
    const res = await axios.post('/api/authenticateUser', body, config);
    //Send the data to react dev tool 'Action' tab
    dispatch({
      type: LOGIN_SUCCESS,
      //note: the 'payload: res.data' now has the token sent back from server to be used for verification
      payload: res.data,
    });

    dispatch(loadUser());
    //
  } catch (err) {
    //

    const errors = err.response.data.errors;

    if (errors) {
      //invoke the dispatch ACTION function 'setAlert'
      //for every error that exist in the array print out its messages in the pre-built component
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    } 
    //cause a change in the redux dev tool 'action' to which reducers/auth file is invoked
    dispatch({
      type: LOGIN_FAIL,
    });
    //
  }

  //
};

//=============================================================================
export const logout = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOGOUT,
  });
};
