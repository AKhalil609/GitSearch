import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { fetchRepositories } from '../../api/githubApi';
import {
  type UserRepositories,
  Status,
  type Repository,
  type rejectedPayload,
} from '../types';

const initialState: UserRepositories = {};

export const getRepositories = createAsyncThunk(
  'repositories/get',
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await fetchRepositories(username);
      return { username, repositories: response };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue({ username, error: error.message });
      } else {
        return rejectWithValue({
          username,
          error: 'An unexpected error occurred.',
        });
      }
    }
  }
);

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
        const { username, error } = action.payload as rejectedPayload;
        if (!state[username]) {
          state[username] = {
            repositories: [],
            status: Status.Failed,
            error: null,
          };
        }
        state[username].status = Status.Failed;
        state[username].error = error;
      });
  },
});

export const selectUserRepositories = (state: RootState, username: string) =>
  state.repositories[username]?.repositories || [];
export const selectUserRepositoriesStatus = (
  state: RootState,
  username: string
) => state.repositories[username]?.status || Status.Idle;
export const selectUserRepositoriesLoading = (
  state: RootState,
  username: string
) => state.repositories[username]?.status === Status.Loading;
export const selectUserRepositoriesError = (
  state: RootState,
  username: string
) => state.repositories[username]?.error || null;

export default repositoriesSlice.reducer;
