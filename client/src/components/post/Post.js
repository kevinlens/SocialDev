/*Note: useEffect can also act the same way as componentDidMount(), 
meaing execute upon: page refresh or page load, by using '[]' it will do it only once*/
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//Connects component to Redux(for global state accessibility)
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';

//instead of doing props.match, you can just destructure it to 'match', props.match is widely available
const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
    //this is just filling in the [] as a dependency to avoid terminal error messages
  }, [getPost, match.params.id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
    
      <Link to="/posts" className="btn">
        Back to Posts
      </Link>

      <PostItem post={post} showActions={false} />

      {/* comment form */}
      <CommentForm postId={post._id} />

      {/* list of comments by different people */}
      {post.comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} postId={post._id} />
      ))}

    </>
  );
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
