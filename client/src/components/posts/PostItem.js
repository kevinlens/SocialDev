import React from 'react';
import PropTypes from 'prop-types';
//Connects component to Redux
import { connect } from 'react-redux';
//helps format our date and time bc the raw date that we get is unorganized
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { addLike, removeLike, deletePost } from '../../actions/post';

//auth coming from global state, post prop passed through from Post.js file
const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
}) => {

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>

      <div>
        <p className="my-1">{text}</p>

        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>

        {/*If showActions is true, THEN show all the little icons and buttons*/}
        {showActions && (
          <>
            <button
              onClick={(e) => addLike(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-up" />{' '}
              <span> {likes.length > 0 && <span>{likes.length}</span>} </span>
            </button>

            <button
              onClick={(e) => removeLike(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-down"></i>
            </button>

            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion{' '}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>

            {/*If auth.loading is no longer true THEN do if user === auth.user._id is true THEN do...*/}
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={(e) => deletePost(_id)}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
//By default showActions should be true
PostItem.defaultProps = {
  showActions: true,
};

/*propTypes aren't necessary they're just there to make sure if you're working in a team
that someone doesn't mess up and pass in the wrong expected prop like array, object, or function*/
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

//to be able to connect to global state auth from reducers/auth file
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
