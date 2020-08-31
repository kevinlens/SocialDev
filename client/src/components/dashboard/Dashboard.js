/*Note: useEffect can also act the same way as componentDidMount(), 
meaing execute upon: page refresh or page load, by using '[]' it will do it only once*/
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//Connects component to Redux(for global state accessibility)
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  //
  useEffect(() => {
    getCurrentProfile();
    //this is just filling in the [] as a dependency to avoid terminal error messages
  }, [getCurrentProfile]);
  /*useEffect --> getCurrentProfile is running synchronously(meaning it doesn't wait) so while it is fetching data the default
'loading: true' remains the same until the data is fetched. This is important because if we don't have it there the program would
assume the empty 'profile' of the user does not exist and then display the component 'create profile' rather than wait for the user's data from the database*/
  /*after 'getProfile' is finished, loading should be set to false but if there was an error along the way, it will also be set to false, 
  with the type: 'PROFILE_ERROR' to tell the program that it's done tryning to fetch data */
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        {/* if the 'user' exist/true, THEN show username */}
        <i className="fas fa-user"> Welcome {user && user.name}</i>
      </p>

      {profile !== null ? (
        <>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus">Delete My Account</i>
            </button>
          </div>
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
/*propTypes aren't necessary they're just there to make sure if you're working in a team
that someone doesn't mess up and pass in the wrong expected prop like array, object, or function*/
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

//to be able to connect to multiple global state from auth to profile state
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
