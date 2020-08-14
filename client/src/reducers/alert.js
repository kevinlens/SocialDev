import {
  SET_ALERT,
  REMOVE_ALERT,
} from '../actions/types';

const initialState = [];

//'action' is the action from the react dex tool payload storage sent from the file actions/alert.js
export default function (
  state = initialState,
  action
) {
  //destructure the payload data sent by the file actions/alert.js
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      //return this state data which is then collected to be turn props in layout/Alert.js
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(
        (alert) => alert.id !== payload
      );
    default:
      return state;
  }
}
