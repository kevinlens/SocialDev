import React from 'react';
import PropTypes from 'prop-types';
//Connects component to Redux(for global state accessibility)
import { connect } from 'react-redux';

//Get the {alerts} destructered from the state props 'mapStateToProps'
//Loop through the 'alerts' ARRAY passed in from the reducers files
//If any error exist in global state error array, print out the alert component with its messages
const Alert = ({ alerts }) =>
//If first statement is true THEN do next one and if true THEN do the third one and output element
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

//Fetch the alert state from the 'redux dev tool array' into this component
//mapping the redux state to ----> this props so that we have access to it
//access to global state 'initialState of reducers/alert'
const mapStateToProps = (state) => ({
  //'state' of the redux dev tool and '.alert' of first tree array name in 'state'
  //To be able to loop through the 'alert' ARRAY passed in from the reducers files
  //this entire array of errror should display on the page if there exist any errors
  alerts: state.alert,
});
//'mapStateToProps' passed in allows for its props to be used and destructured above
export default connect(mapStateToProps)(Alert);
