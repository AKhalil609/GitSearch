import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRepositories } from '../../api/githubApi';
import type { ErrorPayload, SuccessPayload } from '../types';

export const getRepositories = createAsyncThunk<
  SuccessPayload,
  { username: string; page?: number },
  { rejectValue: ErrorPayload }
>('repositories/get', async ({ username, page = 1 }, { rejectWithValue }) => {
  try {
    const response = await fetchRepositories(username, page);
    return { username, repositories: response, page, maxPage: page };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue({ username, error: error.message });
    } else {
      // Handle unexpected errors
      return rejectWithValue({
        username,
        error: 'An unexpected error occurred.',
      });
    }
  }
});
