import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
} from '../actions/types';

//initialState is the global state which allows you to access it anywhere in your components
//note: state is immutable that's why you have to ...state spread it
//The state in which stores all the dispatched actions data state
const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: fales,
      };
    case ADD_POST:
      return {
        ...state,
        //the 'payload' is the new 'Post' object that will be added to the global state array
        posts: [...state.posts, payload],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        //filter through the global posts array state and creat new array without the one with id equal to the payloads id
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        //error could be like the res.status(400) returned from the backend
        erorr: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        /*For every post in the 'posts' array global state, if anyone of them has the same id as the current user logged in Id,
        THEN spread that current post and then set its property 'likes' to the new payload likes, else return the original and do nothing*/
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    default:
      return state;
  }
}
