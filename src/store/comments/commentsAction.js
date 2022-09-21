import axios from 'axios';
import { URL_API } from 'api/const';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const commentsRequestAsync = createAsyncThunk('comments/fetch', (id, { getState }) => {
  const token = getState().tokenReducer.token;
  if (!token) return;

  return axios(`${URL_API}/comments/${id}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
    .then(
      ({ data: [
        {
          data: {
            children: [{ data: post }],
          },
        },
        {
          data: { children },
        },
      ] }) => {
        const comments = children.map(item => item.data);
        return { post, comments };
      },
    )
    .catch(error => {
      console.error('Произошла ошибка: ', error);
      return { error: error.toString() };
    });
});
