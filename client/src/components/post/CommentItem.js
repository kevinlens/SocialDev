import React from 'react';
import PropTypes from 'prop-types';
//Connects component to Redux(for global state accessibility)
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//helps format our date and time bc the raw date that we get is unorganized
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

//destructuring comment object passed in coming from an array of comments
const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
}) => {
  return (
    <section className="post bg-white p-1 my-1">
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

        {!auth.loading && user === auth.user._id && (
          <button
            onClick={(e) => deleteComment(postId, _id)}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </section>
  );
};

/*propTypes aren't necessary they're just there to make sure if you're working in a team
that someone doesn't mess up and pass in the wrong expected prop like array, object, or function*/
CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

//to be able to connect to global state auth from reducers/auth file
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
