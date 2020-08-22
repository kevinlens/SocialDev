import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
} from '../actions/types';

//note: state is immutable that's why you have to ...state spread it
//The state in which stores all the dispatched actions data state
//The state in which we store globally and can be accessed anywhere, you can see it visually in react dev tool
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  //if there is any changes in the 'action tab' of react dev tools activate the programs below
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        //get the current state and spread it in here and add additional changes to it and return it globally
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        //...state will show in the 'state' section and '...payload' in the react dev tool
        //get the current state/payload and spread it in here so we could add changes to it and provide it to be global state as ONE WHOLE STATE
        /*For example ...state is the initialState current data which you pass in, in order to do changes to the global state
        the ...payload(msg and token) is the new data passed back from server( /api/users route ) that will also be added to the react dev tool 
        'state' temporarily and then you add additional changes to the state down below */
        //pass in current global state and update it with the declarations below
        ...state,
        //do this to spread and get the token and msg from {msg, token} payload object
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        //pass in current global state and update it with the declarations below
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
  //
}
