import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Status, type User } from '../types';
import { initialState } from './initialState';
import { searchUsers } from './thunks';

const userSearchSlice = createSlice({
  name: 'userSearch',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.users = [];
      state.status = Status.Idle;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(
        searchUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.status = Status.Success;
          state.users = action.payload;
        }
      )
      .addCase(searchUsers.rejected, (state, action) => {
        state.status = Status.Failed;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { clearSearchResults } = userSearchSlice.actions;

export default userSearchSlice.reducer;
