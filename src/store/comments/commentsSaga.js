import { put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { URL_API } from 'api/const';
import { COMMENTS_REQUEST, commentsRequestSuccess, commentsRequestError } from './commentsAction';

function* fetchComments({ id }) {
  yield put({
    type: 'comments/commentsRequest',
  });
  const token = yield select(state => state.tokenReducer.token);
  try {
    const request = yield axios(`${URL_API}/comments/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    const { data: [
      {
        data: {
          children: [{ data: post }],
        },
      },
      {
        data: { children },
      },
    ] } = request;
    const comments = children.map(item => item.data);
    yield put({
      type: 'comments/commentsRequestSuccess',
      payload: commentsRequestSuccess({ post, comments })
    });
  } catch (err) {
    yield put({
      type: 'comments/commentsRequestError',
      payload: commentsRequestError(err.toString()),
    });
  }
}

export function* watchComments() {
  yield takeLatest(COMMENTS_REQUEST, fetchComments);
}
