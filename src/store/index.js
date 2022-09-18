import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import thunk from 'redux-thunk';
import { tokenMiddleware, tokenReducer } from './tokenReducer';
import { authReducer } from './auth/authReducer';
import { postsReducer } from './posts/postsReducer';
import { commentsReducer } from './comments/commentsReducer';
import { commentReducer } from './commentReducer';

const rootReducer = combineReducers({
  tokenReducer,
  auth: authReducer,
  posts: postsReducer,
  comments: commentsReducer,
  commentReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(tokenMiddleware, thunk)));
