import type { UserSearchState } from '../types';

export const initialState: UserSearchState = {
  users: [],
  status: 'idle',
  error: null,
};
