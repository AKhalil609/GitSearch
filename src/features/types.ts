export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'succeeded',
  Failed = 'failed',
}

export interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
}

export interface UserRepositories {
  [username: string]: {
    repositories: Repository[];
    status: Status.Idle | Status.Loading | Status.Success | Status.Failed;
    error: string | null;
    maxPage?: number;
  };
}

export interface User {
  login: string;
  id: number;
  avatar_url: string;
}

export interface UserSearchState {
  users: User[];
  status: Status.Idle | Status.Loading | Status.Success | Status.Failed;
  error: string | null;
}

export interface SuccessPayload {
  username: string;
  repositories: Repository[];
  page: number;
}

export interface ErrorPayload {
  username: string;
  error: string;
}
