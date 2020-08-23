/*Note: useEffect can also act the same way as componentDidMount(), 
meaing execute upon: page refresh or page load, by using '[]' it will do it only once*/
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';

//instead of doing props.match, you can just destructure it to 'match'
const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
    //this is just filling in the [] as a dependency to avoid terminal error messages
  }, [getProfileById]);
  return <div>Profile</div>;
};

/*propTypes aren't necessary they're just there to make sure if you're working in a team
that someone doesn't mess up and pass in the wrong expected prop like array, object, or function*/
Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

//to be able to connect to global state profile state and state auth
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
