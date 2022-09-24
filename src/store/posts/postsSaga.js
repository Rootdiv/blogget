import { put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { URL_API } from 'api/const';
import { POSTS_REQUEST, postsRequestSuccess, postsRequestError } from './postsAction';

const fetchPosts = async (token, page) => {
  const request = await axios(`${URL_API}/${page}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  }).catch(error => error);
  return request;
};

function* workerPosts(action) {
  const token = yield select(state => state.tokenReducer.token);
  const { data, status, message } = yield fetchPosts(token, action.page);
  if (status === 200) {
    yield put({
      type: `posts/${postsRequestSuccess.name}`,
      payload: postsRequestSuccess(action.page, data.data),
    });
  } else {
    yield put({
      type: `posts/${postsRequestError.name}`,
      payload: postsRequestError(message),
    });
  }
}

export function* watchPosts() {
  yield takeLatest(POSTS_REQUEST, workerPosts);
}
