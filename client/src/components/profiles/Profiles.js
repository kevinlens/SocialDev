/*Note: useEffect can also act the same way as componentDidMount(), 
meaing execute upon: page refresh or page load, by using '[]' it will do it only once*/
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
//Connects component to Redux
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

//'profiles' is an array of users from the database
const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
    //this is just filling in the [] as a dependency to avoid terminal error messages
  }, [getProfiles]);
  return (
    <>
    {/* when page is reset 'loading' turns to 'true' */}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i>Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              //map through the list of users array and pass in individuals as components for every item in there
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

/*propTypes aren't necessary they're just there to make sure if you're working in a team
that someone doesn't mess up and pass in the wrong expected prop like array, object, or function*/
Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

//to be able to connect to global state profile state
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
