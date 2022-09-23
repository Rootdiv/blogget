import { createSlice } from '@reduxjs/toolkit';
import { postsRequestAsync } from './postsAction';

const initialState = {
  loading: false,
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
    // postsRequestSuccessAfter: (state, action) => {
    //   state.loading = false;
    //   state.posts = [...state.posts, ...action.payload.children];
    //   state.error = '';
    //   state.after = action.payload.after;
    //   state.isLast = !action.payload.after;
    //   state.counter = ++state.counter;
    // },
    changePage: (state, action) => {
      state.posts = [];
      state.page = action.payload;
      state.after = '';
      state.isLast = false;
      state.counter = 0;
    },
  },
  extraReducers: {
    [postsRequestAsync.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [postsRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.posts = action.payload.posts;
      state.page = action.payload.page;
      state.error = '';
      state.after = action.payload.after;
      state.isLast = !action.payload.after;
      state.counter = action.payload.counter;
    },
    [postsRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default postsSlice.reducer;
