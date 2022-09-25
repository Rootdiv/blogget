export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_REQUEST_SUCCESS = 'SEARCH_REQUEST_SUCCESS';
export const SEARCH_REQUEST_SUCCESS_AFTER = 'SEARCH_REQUEST_SUCCESS_AFTER';
export const SEARCH_REQUEST_ERROR = 'SEARCH_REQUEST_ERROR';
export const SEARCH_REQUEST_RESET = 'SEARCH_REQUEST_RESET';

export const searchRequest = search => ({
  type: SEARCH_REQUEST,
  search,
});

export const searchRequestSuccess = (search, counter, { children, after }) => ({
  type: SEARCH_REQUEST_SUCCESS,
  search,
  posts: children,
  after,
  counter,
});

export const searchRequestSuccessAfter = (search, counter, { children, after }) => ({
  type: SEARCH_REQUEST_SUCCESS_AFTER,
  search,
  posts: children,
  after,
  counter,
});

export const searchRequestError = error => ({
  type: SEARCH_REQUEST_ERROR,
  error,
});

export const searchRequestReset = () => ({
  type: SEARCH_REQUEST_RESET,
});
