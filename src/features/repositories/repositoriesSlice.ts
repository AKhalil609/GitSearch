import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Status, type Repository } from '../types';
import { initialState } from './initialState';
import { getRepositories } from './thunks';

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRepositories.pending, (state, action) => {
        const { arg: username } = action.meta;
        if (!state[username]) {
          state[username] = {
            repositories: [],
            status: Status.Loading,
            error: null,
          };
        } else {
          state[username].status = Status.Loading;
        }
      })
      .addCase(
        getRepositories.fulfilled,
        (
          state,
          action: PayloadAction<{
            username: string;
            repositories: Repository[];
          }>
        ) => {
          const { username, repositories } = action.payload;
          if (!state[username]) {
            state[username] = {
              repositories: [],
              status: Status.Success,
              error: null,
            };
          }
          state[username].repositories = repositories;
          state[username].status = Status.Success;
        }
      )
      .addCase(getRepositories.rejected, (state, action) => {
        const { arg: username } = action.meta; // Get username from meta.arg
        const error = action.error.message; // Get error message

        if (!state[username]) {
          state[username] = {
            repositories: [],
            status: Status.Failed,
            error: error || null,
          };
        } else {
          state[username].status = Status.Failed;
          state[username].error = error || null;
        }
      });
  },
});

export default repositoriesSlice.reducer;
