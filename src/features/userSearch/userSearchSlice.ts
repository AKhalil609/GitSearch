import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { fetchUsers } from '../../api/githubApi';
import type { User, UserSearchState } from '../types';

const initialState: UserSearchState = {
  users: [],
  status: 'idle',
  error: null,
};

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

export const selectUsers = (state: RootState) => state.userSearch.users;
export const selectUsersStatus = (state: RootState) => state.userSearch.status;
export const selectUsersError = (state: RootState) => state.userSearch.error;
export const selectUsersLoading = (state: RootState) =>
  state.userSearch.status === 'loading';
export const { clearSearchResults } = userSearchSlice.actions;

export default userSearchSlice.reducer;
