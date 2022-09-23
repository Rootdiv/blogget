import { configureStore } from '@reduxjs/toolkit';
import { tokenMiddleware, tokenReducer } from './tokenReducer';
import { authReducer } from './auth/authReducer';
import postsReducer from './posts/postsSlice';
import commentsReducer from './comments/commentsSlice';
import { commentReducer } from './commentReducer';

export const store = configureStore({
  reducer: {
    tokenReducer,
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
    commentReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tokenMiddleware),
});
