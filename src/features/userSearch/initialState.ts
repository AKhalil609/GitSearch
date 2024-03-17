import { Status, type UserSearchState } from '../types';

export const initialState: UserSearchState = {
  users: [],
  status: Status.Idle,
  error: null,
};
