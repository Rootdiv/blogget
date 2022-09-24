export const POSTS_REQUEST = 'POSTS_REQUEST';
const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';

export const postsRequest = page => ({
  type: POSTS_REQUEST,
  page,
});

export const postsRequestSuccess = (page, { children, after }) => ({
  type: POSTS_REQUEST_SUCCESS,
  posts: children,
  after,
  page,
});

export const postsRequestError = error => ({
  type: POSTS_REQUEST_ERROR,
  error,
});
