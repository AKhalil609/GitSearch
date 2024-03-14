import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { fetchUsers } from '../api/githubApi';

interface User {
  login: string;
  id: number;
  avatar_url: string;
}

interface UserSearchState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserSearchState = {
  users: [],
  status: 'idle',
  error: null,
};

export const searchUsers = createAsyncThunk(
  'users/search',
  async (username: string) => {
    const response = await fetchUsers(username);
    return response.items;
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
      .addCase(searchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const selectUsers = (state: RootState) => state.userSearch.users;
export const selectUsersStatus = (state: RootState) => state.userSearch.status;
export const selectUsersError = (state: RootState) => state.userSearch.error;
export const { clearSearchResults } = userSearchSlice.actions;

export default userSearchSlice.reducer;