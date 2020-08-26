import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';

//Role is to combine all the reducers into one
/*This is where you make possible for the actions folder and reducer folder to coincide with one another.
It makes it so that the reducer folder can read the actions folder dispatch and its TYPE to make changes in the
global state. If you do "import post from ./profile" you would end up 'post: profile data' rather than 'post: post data'
in the global state if that makes any sense*/
export default combineReducers({
  alert,
  auth,
  profile,
  post,
});
