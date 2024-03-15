import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers } from '../../api/githubApi';

export const searchUsers = createAsyncThunk(
  'users/search',
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await fetchUsers(username);
      return response.items;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unexpected error occurred.');
      }
    }
  }
);
