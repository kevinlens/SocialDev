import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';

//Role is to combine all the reducers into one
export default combineReducers({
  alert,
  auth,
  profile,
});
