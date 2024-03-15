import type { RootState } from '../../app/store';
import { Status } from '../types';

export const selectUserRepositories = (state: RootState, username: string) =>
  state.repositories[username]?.repositories || [];

export const selectUserRepositoriesStatus = (
  state: RootState,
  username: string
) => state.repositories[username]?.status || Status.Idle;

export const selectUserRepositoriesLoading = (
  state: RootState,
  username: string
) => state.repositories[username]?.status === Status.Loading;

export const selectUserRepositoriesError = (
  state: RootState,
  username: string
) => state.repositories[username]?.error || null;
