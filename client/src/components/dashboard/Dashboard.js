/*Note: useEffect can also act the same way as componentDidMount(), 
meaing execute upon: page refresh or page load, by using '[]' it will do it only once*/
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  //
  useEffect(() => {
    getCurrentProfile();
  }, []);
  //usesEffect-->getCurrentProfile is running synchronously(meaning it doesn't wait) therefore 'loading' has a chance to be true(loading)
  //'loading is true, && profile === null'
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        {/* if the 'user' exist, then show username */}
        <i className="fas fa-user"> Welcome {user && user.name}</i>
      </p>

      {profile !== null ? (
        <>
          <DashboardActions />
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </>
  );
  //
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

//to be able to connect to multiple global state from auth to profile state
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
