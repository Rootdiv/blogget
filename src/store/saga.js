import { all } from 'redux-saga/effects';
import { watchSearch } from './search/searchSaga';
import { watchPosts } from './posts/postsSaga';

export default function* rootSaga() {
  yield all([
    watchSearch(),
    watchPosts(),
  ]);
}
