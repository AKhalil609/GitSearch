import { createSelector } from 'reselect';
import { RootState } from '../../app/store';
import { Status } from '../types';

const DEFAULT_REPOSITORIES_STATE = {
  repositories: [],
  status: Status.Idle,
  error: null,
};

const getRepositoriesState = (state: RootState, username: string) =>
  state.repositories[username] || DEFAULT_REPOSITORIES_STATE;

export const selectUserRepositories = createSelector(
  [getRepositoriesState],
  (repositoriesState) => repositoriesState.repositories
);

export const selectUserRepositoriesStatus = createSelector(
  [getRepositoriesState],
  (repositoriesState) => repositoriesState.status
);

export const selectUserRepositoriesLoading = createSelector(
  [selectUserRepositoriesStatus],
  (status) => status === Status.Loading
);

export const selectUserRepositoriesError = createSelector(
  [getRepositoriesState],
  (repositoriesState) => repositoriesState.error
);
