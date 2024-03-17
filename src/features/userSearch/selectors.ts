import { createSelector } from 'reselect';
import type { RootState } from '../../app/store';
import { Status } from '../types';

const getUserSearchState = (state: RootState) => state.userSearch;

export const selectUsers = createSelector(
  [getUserSearchState],
  (userSearch) => userSearch.users
);

export const selectUsersStatus = createSelector(
  [getUserSearchState],
  (userSearch) => userSearch.status
);

export const selectUsersError = createSelector(
  [getUserSearchState],
  (userSearch) => userSearch.error
);

export const selectUsersLoading = createSelector(
  [selectUsersStatus],
  (status) => status === Status.Loading
);
