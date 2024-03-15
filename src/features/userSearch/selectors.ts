import type { RootState } from '../../app/store';

export const selectUsers = (state: RootState) => state.userSearch.users;
export const selectUsersStatus = (state: RootState) => state.userSearch.status;
export const selectUsersError = (state: RootState) => state.userSearch.error;
export const selectUsersLoading = (state: RootState) =>
  state.userSearch.status === 'loading';
