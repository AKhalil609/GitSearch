import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { fetchRepositories } from '../api/githubApi';

interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string;
}

interface UserRepositories {
  [username: string]: {
    repositories: Repository[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
}

const initialState: UserRepositories = {};

export const getRepositories = createAsyncThunk(
  'repositories/get',
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await fetchRepositories(username);
      return { username, repositories: response };
    } catch (error) {
      return rejectWithValue({ username, error: error.message });
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
          state[username] = { repositories: [], status: 'loading', error: null };
        } else {
          state[username].status = 'loading';
        }
      })
      .addCase(getRepositories.fulfilled, (state, action: PayloadAction<{ username: string; repositories: Repository[] }>) => {
        const { username, repositories } = action.payload;
        if (!state[username]) {
          state[username] = { repositories: [], status: 'succeeded', error: null };
        }
        state[username].repositories = repositories;
        state[username].status = 'succeeded';
      })
      .addCase(getRepositories.rejected, (state, action) => {
        const { username, error } = action.payload as any;
        if (!state[username]) {
          state[username] = { repositories: [], status: 'failed', error: null };
        }
        state[username].status = 'failed';
        state[username].error = error;
      });
  },
});

export const selectUserRepositories = (state: RootState, username: string) => state.repositories[username]?.repositories || [];
export const selectUserRepositoriesStatus = (state: RootState, username: string) => state.repositories[username]?.status || 'idle';
export const selectUserRepositoriesError = (state: RootState, username: string) => state.repositories[username]?.error || null;

export default repositoriesSlice.reducer;
