import { put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { URL_API } from 'api/const';
import { POSTS_REQUEST, postsRequestSuccess, postsRequestError } from './postsAction';

const fetchPosts = async (token, page, after) => {
  const request = await axios(`${URL_API}/${page}?limit=10${after ? `&after=${after}` : ''}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  }).catch(error => error);
  return request;
};

function* workerPosts() {
  yield put({
    loading: true,
    type: 'posts/postsRequest',
  });
  const token = yield select(state => state.tokenReducer.token);
  const after = yield select(state => state.posts.after);
  const page = yield select(state => state.posts.page);
  let counter = yield select(state => state.posts.counter);
  const { data, status, message } = yield fetchPosts(token, page, after);
  if (status === 200) {
    if (after) {
      ++counter;
      yield put({
        type: 'posts/postsRequestSuccessAfter',
        payload: postsRequestSuccess(page, counter, data.data),
      });
    } else {
      yield put({
        type: `posts/${postsRequestSuccess.name}`,
        payload: postsRequestSuccess(page, counter, data.data),
      });
    }
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
