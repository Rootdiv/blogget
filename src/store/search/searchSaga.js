import { apply, call, put, select, takeLatest } from 'redux-saga/effects';
import { URL_API } from 'api/const';

import {
  SEARCH_REQUEST,
  searchRequestSuccess,
  searchRequestSuccessAfter,
  searchRequestError,
} from './searchAction';

function* fetchSearch({ search, after, counter }) {
  const token = yield select(state => state.tokenReducer.token);
  try {
    const request = yield call(fetch, `${URL_API}/search?q=${search}&limit=10${after ? `&after=${after}` : ''}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    const response = yield apply(request, request.json);
    if (after) {
      yield put(searchRequestSuccessAfter(search, counter, response.data));
    } else {
      yield put(searchRequestSuccess(search, counter, response.data));
    }
  } catch (err) {
    yield put(searchRequestError(err.toString()));
  }
}

export function* watchSearch() {
  yield takeLatest(SEARCH_REQUEST, fetchSearch);
}
