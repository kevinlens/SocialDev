import React from 'react';
import PropTypes from 'prop-types';
//Connects component to Redux
import { connect } from 'react-redux';

//Get the {alerts} destructered from the state props 'mapStateToProps'
//Loop through the 'alerts' ARRAY passed in from the reducers files
const Alert = ({ alerts }) =>
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
  alerts: state.alert,
});
//'mapStateToProps' passed in allows for its props to be used and destructured above
export default connect(mapStateToProps)(Alert);
