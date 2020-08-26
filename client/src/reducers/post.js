import { GET_POST, POST_ERROR } from '../actions/types';

//initialState is the global state which allows you to access it anywhere in your components
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
    case POST_ERROR:
      return {
        ...state,
        posts: payload,
        loading: false,
      };      
    default:
      return state;
  }
}
