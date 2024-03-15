import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../types';
import { initialState } from './initialState';
import { searchUsers } from './thunks';

const userSearchSlice = createSlice({
  name: 'userSearch',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.users = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        searchUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.status = 'succeeded';
          state.users = action.payload;
        }
      )
      .addCase(searchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { clearSearchResults } = userSearchSlice.actions;

export default userSearchSlice.reducer;
