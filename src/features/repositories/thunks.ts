import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRepositories } from '../../api/githubApi';

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
