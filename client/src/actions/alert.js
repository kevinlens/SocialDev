//universal id
import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

//Actions are payloads of information that send data from your application to your store.
//What Dispatch does: It dispatches an ACTION. This is the only way to trigger a state change.
//'alertType' is just another message like 'success' or 'danger'
export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuid.v4();
  //If you look at your react dev tools in 'Action' you can see the payload data sent out from just the function below
  //the 'action' payload now has the data that you work with in the reducers/alert.js folder/file
  //the 'type' is also set from the dispatch for the reducers/alert.js file to distinguish and read
  //IF THIS FUNCTION IS CALLED THE DISPATCH WILL BE INVOKED
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  //after time is up start individually removing alert items in array with similar id
  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      }),
    timeout
  );
  //
};
