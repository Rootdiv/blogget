import axios from 'axios';
import { URL_API } from 'api/const';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const postsRequestAsync = createAsyncThunk('posts/fetch', (newPage, { getState }) => {
  let page = getState().posts.page;
  if (newPage) {
    page = newPage;
  }
  const token = getState().tokenReducer.token;
  const posts = getState().posts.posts;
  const after = getState().posts.after;
  const isLast = getState().posts.isLast;
  const counter = getState().posts.counter;

  if (!token || isLast) return;

  return axios(`${URL_API}/${page}?limit=10${after ? `&after=${after}` : ''}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
    .then(({ data: { data } }) => {
      let newPosts = data.children;
      let pageNum = 0;
      if (after) {
        newPosts = [...posts, ...newPosts];
        pageNum = counter + 1;
      }
      return ({
        posts: newPosts,
        after: data.after,
        counter: pageNum,
        page,
      });
    })
    .catch(error => {
      console.error('Произошла ошибка: ', error);
      return { error: error.toString() };
    });
});
