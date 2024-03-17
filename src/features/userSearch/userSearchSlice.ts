import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Status, type User } from '../types';
import { initialState } from './initialState';
import { searchUsers } from './thunks';

/**
 * `userSearchSlice` is a Redux slice that manages the state related to user search operations.
 * It supports initiating a search, updating the state with search results, and clearing those results.
 *
 * The state structure includes:
 * - `users`: An array of `User` objects representing the search results.
 * - `status`: A `Status` enum value (`Idle`, `Loading`, `Success`, `Failed`) representing the current state of the search operation.
 * - `error`: A string to store an error message in case the search operation fails.
 *
 * Actions handled:
 * - `searchUsers.pending`: Initiates a search operation, setting the status to `Loading`.
 * - `searchUsers.fulfilled`: Updates the state with the search results and sets the status to `Success`.
 * - `searchUsers.rejected`: Handles a failed search operation by setting the status to `Failed` and storing an error message.
 *
 * Reducers:
 * - `clearSearchResults`: Resets the search state, clearing all results and setting the status back to `Idle`.
 */

const userSearchSlice = createSlice({
  name: 'userSearch',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.users = [];
      state.status = Status.Idle;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(
        searchUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.status = Status.Success;
          state.users = action.payload;
        }
      )
      .addCase(searchUsers.rejected, (state, action) => {
        state.status = Status.Failed;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { clearSearchResults } = userSearchSlice.actions;

export default userSearchSlice.reducer;
