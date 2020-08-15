import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';

//Role is to combine all the reducers into one
export default combineReducers({
  alert,
  auth,
});
