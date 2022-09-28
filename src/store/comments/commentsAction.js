export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
const COMMENTS_REQUEST_SUCCESS = 'COMMENTS_REQUEST_SUCCESS';
const COMMENTS_REQUEST_ERROR = 'COMMENTS_REQUEST_ERROR';

export const commentsRequest = id => ({
  type: COMMENTS_REQUEST,
  id,
  post: {},
  comments: [],
});

export const commentsRequestSuccess = ({ post, comments }) => ({
  type: COMMENTS_REQUEST_SUCCESS,
  post,
  comments,
});

export const commentsRequestError = error => ({
  type: COMMENTS_REQUEST_ERROR,
  error,
});
