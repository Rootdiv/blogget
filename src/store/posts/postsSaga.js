import { put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { URL_API } from 'api/const';
import { postsRequestSuccess } from './postsAction';

const fetchPosts = async token => {
  const request = await axios(`${URL_API}/best`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  return request;
};

function* workerPosts() {
  const token = yield select(state => state.tokenReducer.token);
  const { data } = yield fetchPosts(token);
  yield put(postsRequestSuccess(data.data));
}

export function* watchPosts() {
  yield takeLatest('POSTS_REQUEST', workerPosts);
}
