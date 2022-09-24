import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  posts: [],
  error: '',
  after: '',
  page: '',
  isLast: false,
  counter: 0,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsRequest: (state) => {
      state.loading = true;
      state.error = '';
    },
    postsRequestSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload.posts;
      state.page = action.payload.page;
      state.error = '';
      state.after = action.payload.after;
      state.isLast = !action.payload.after;
      state.counter = action.payload.counter;
    },
    // postsRequestSuccessAfter: (state, action) => {
    //   state.loading = false;
    //   state.posts = [...state.posts, ...action.payload.children];
    //   state.error = '';
    //   state.after = action.payload.after;
    //   state.isLast = !action.payload.after;
    //   state.counter = ++state.counter;
    // },
    postsRequestError: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    changePage: (state, action) => {
      state.loading = true;
      state.posts = [];
      state.page = action.payload;
      state.after = '';
      state.isLast = false;
      state.counter = 0;
    },
  },
});

export default postsSlice.reducer;
