import axios from 'axios';
import { URL_API } from 'api/const';

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
export const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';
export const POSTS_REQUEST_SUCCESS_AFTER = 'POSTS_REQUEST_SUCCESS_AFTER';

export const postsRequest = () => ({
  type: POSTS_REQUEST,
});

export const postsRequestSuccess = data => ({
  type: POSTS_REQUEST_SUCCESS,
  data: data.children,
  after: data.after,
});

export const postsRequestSuccessAfter = data => ({
  type: POSTS_REQUEST_SUCCESS_AFTER,
  data: data.children,
  after: data.after,
});

export const postsRequestError = error => ({
  type: POSTS_REQUEST_ERROR,
  error,
});

export const postsRequestAsync = () => (dispatch, getState) => {
  const token = getState().tokenReducer.token;
  const after = getState().posts.after;
  const loading = getState().posts.loading;
  const isLast = getState().posts.isLast;

  if (!token || loading || isLast) return;

  dispatch(postsRequest());
  axios(`${URL_API}/best?limit=10${after ? `&after=${after}` : ''}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
    .then(({ data: { data } }) => {
      if (after) {
        dispatch(postsRequestSuccessAfter(data));
      } else {
        dispatch(postsRequestSuccess(data));
      }
    })
    .catch(err => {
      console.error('Произошла ошибка: ', err);
      dispatch(postsRequestError(err.toString()));
    });
};
