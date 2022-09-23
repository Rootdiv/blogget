import { apply, call, put, select, takeLatest } from 'redux-saga/effects';
// import axios from 'axios';
import { URL_API } from 'api/const';
import { SEARCH_REQUEST, searchRequestSuccess, searchRequestError } from './searchAction';

// const fetchSearch = async (action, token) => {
//   const request = await axios(`${URL_API}/search?q=${action.search}`, {
function* fetchSearch(search) {
  const token = yield select(state => state.tokenReducer.token);
  try {
    const request = yield call(fetch, `${URL_API}/search?q=${search}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    const response = yield apply(request, request.json);
    yield put(searchRequestSuccess(response.data));
  } catch (err) {
    yield put(searchRequestError(err.toString()));
  }
}

// function* workerSearch(action) {
//   const token = yield select(state => state.tokenReducer.token);
//   const { data } = yield call(fetchSearch, action.search, token);
//   yield put(searchRequestSuccess(data));
// }

export function* watchSearch() {
  // yield takeLatest(SEARCH_REQUEST, workerSearch);
  yield takeLatest(SEARCH_REQUEST, fetchSearch);
}
