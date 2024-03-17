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
        const { username } = action.meta.arg;
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
            page: number;
          }>
        ) => {
          const { username, repositories, page } = action.payload;
          if (!state[username]) {
            state[username] = {
              repositories: [],
              status: Status.Success,
              error: null,
            };
          }
          if (repositories.length === 0) {
            state[username].repositories = [
              ...state[username].repositories,
              ...repositories,
            ];
            state[username].maxPage = page;
          }

          state[username].repositories = [
            ...state[username].repositories,
            ...repositories,
          ];
          state[username].status = Status.Success;
        }
      )
      .addCase(getRepositories.rejected, (state, action) => {
        const { username } = action.meta.arg;
        const error = action.error.message;

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
