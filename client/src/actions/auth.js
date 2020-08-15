import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

// Register User
export const register = ({
  name,
  email,
  password,
}) => async (dispatch) => {
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
    const res = await axios.post(
      '/api/users',
      body,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    //
  } catch (err) {
    //

    const errors = err.response.data.errors;

    if (errors) {
      //invoke the dispatch ACTION function 'setAlert'
      //for every error that exist in the array print out its messages in the pre-built component
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger'))
      );
    }
    //cause a change in the redux dev tool 'action' to which reducers/auth file is invoked
    dispatch({
      type: REGISTER_FAIL,
    });
    //
  }

  //
};
