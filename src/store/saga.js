import { all } from 'redux-saga/effects';
import { watchSearch } from './search/searchSaga';
import { watchPosts } from './posts/postsSaga';
import { watchComments } from './comments/commentsSaga';

export default function* rootSaga() {
  yield all([
    watchSearch(),
    watchPosts(),
    watchComments(),
  ]);
}
