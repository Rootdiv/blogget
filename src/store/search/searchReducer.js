import { SEARCH_REQUEST,
  SEARCH_REQUEST_SUCCESS,
  SEARCH_REQUEST_SUCCESS_AFTER,
  SEARCH_REQUEST_ERROR,
  SEARCH_REQUEST_RESET
} from './searchAction';

const initialState = {
  loading: false,
  posts: [],
  search: '',
  after: '',
  error: '',
  isLast: false,
  counter: 0,
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        search: action.search,
        error: '',
      };
    case SEARCH_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        search: action.search,
        posts: action.posts,
        error: '',
        after: action.after,
        isLast: !action.after,
      };
    case SEARCH_REQUEST_SUCCESS_AFTER:
      return {
        ...state,
        loading: false,
        search: action.search,
        posts: [...state.posts, ...action.posts],
        error: '',
        after: action.after,
        isLast: !action.after,
        counter: state.counter + 1,
      };
    case SEARCH_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SEARCH_REQUEST_RESET:
      return {
        ...state,
        loading: false,
        search: '',
        posts: [],
        after: '',
        counter: 0,
      };

    default:
      return state;
  }
};
