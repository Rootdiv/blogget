import {
  POSTS_REQUEST,
  POSTS_REQUEST_ERROR,
  POSTS_REQUEST_SUCCESS,
  POSTS_REQUEST_SUCCESS_AFTER,
  CHANGE_PAGE
} from './postsAction';

const initialState = {
  loading: false,
  posts: [],
  error: '',
  after: '',
  isLast: false,
  page: '',
  counter: 0,
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case POSTS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.data,
        error: '',
        after: action.after,
        isLast: !action.after,
      };
    case POSTS_REQUEST_SUCCESS_AFTER:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, ...action.data],
        error: '',
        after: action.after,
        isLast: !action.after,
        counter: ++state.counter,
      };
    case POSTS_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CHANGE_PAGE:
      return {
        ...state,
        posts: [],
        page: action.page,
        after: '',
        isLast: false,
        counter: 0,
      };

    default:
      return state;
  }
};
