import { SEARCH_REQUEST, SEARCH_REQUEST_SUCCESS, SEARCH_REQUEST_ERROR } from './searchAction';

const initialState = {
  loading: false,
  posts: [],
  error: '',
  after: '',
  page: '',
  isLast: false,
  counter: 0,
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case SEARCH_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.posts,
        error: '',
      };
    case SEARCH_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
