import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Status, type Repository } from '../types';
import { initialState } from './initialState';
import { getRepositories } from './thunks';

/**
 * `repositoriesSlice` Redux slice managing the state related to GitHub repositories for different users.
 * It handles asynchronous actions to fetch a user's GitHub repositories, including loading, success, and failure states.
 *
 * The state structure for `repositories` includes:
 * - `repositories`: An array of `Repository` objects representing the user's GitHub repositories.
 * - `status`: A `Status` enum indicating the loading state (`Loading`, `Success`, `Failed`).
 * - `error`: A string for storing potential error messages during fetching operations.
 * - `maxPage`: (Optional) A number indicating the maximum page number of paginated repository results.
 *
 * Actions handled:
 * - `getRepositories.pending`: Sets the loading state for a user's repositories.
 * - `getRepositories.fulfilled`: Updates the state with fetched repositories, marks the operation as successful.
 * - `getRepositories.rejected`: Sets the state to failed and stores the error message.
 */

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
