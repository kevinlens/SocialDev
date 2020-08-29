/*Note: useEffect can also act the same way as componentDidMount(), 
meaing execute upon: page refresh or page load, by using '[]' it will do it only once*/
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
//Connects component to Redux
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';

const Post = ({ getPost }) => {
  useEffect(() => {
    getPost(match.params.id);
    //this is just filling in the [] as a dependency to avoid terminal error messages
  }, [getPost]);

  return <div></div>;
};

/*propTypes aren't necessary they're just there to make sure if you're working in a team
that someone doesn't mess up and pass in the wrong expected prop like array, object, or function*/
Post.propTypes = {
  getPost: PropTypes.func.isRequired,
};

//to be able to connect to global state post from reducers/post file
const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
