import { configureStore } from '@reduxjs/toolkit';
import { tokenMiddleware, tokenReducer } from './tokenReducer';
import { authReducer } from './auth/authReducer';
import postsReducer from './posts/postsSlice';
import commentsReducer from './comments/commentsSlice';
import { commentReducer } from './commentReducer';
import { searchReducer } from './search/searchReducer';
import createSagaMiddleware from '@redux-saga/core';// from 'redux-saga'
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    tokenReducer,
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
    commentReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tokenMiddleware, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
