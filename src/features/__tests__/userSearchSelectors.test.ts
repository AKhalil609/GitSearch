import { RootState } from '../../app/store';
import { Status } from '../types';
import {
  selectUsers,
  selectUsersStatus,
  selectUsersError,
  selectUsersLoading,
} from '../userSearch/selectors';

const mockRootState: RootState = {
  userSearch: {
    users: [
      { id: 1, login: 'johndoe', avatar_url: 'http://example.com/avatar.jpg' },
    ],
    status: 'loading',
    error: 'An error occurred',
  },
  repositories: {
    johnDoe: {
      repositories: [
        {
          id: 1,
          name: 'repo1',
          html_url: 'http://example.com/repo1',
          description: 'Repository 1',
          stargazers_count: 100,
        },
      ],
      status: Status.Success,
      error: null,
    },
  },
};

describe('UserSearch Selectors', () => {
  test('selectUsers returns the user search results', () => {
    const users = selectUsers(mockRootState);
    expect(users).toEqual(mockRootState.userSearch.users);
  });

  test('selectUsersStatus returns the current status of the user search', () => {
    const status = selectUsersStatus(mockRootState);
    expect(status).toEqual('loading');
  });

  test('selectUsersError returns the current error of the user search', () => {
    const error = selectUsersError(mockRootState);
    expect(error).toEqual('An error occurred');
  });

  test('selectUsersLoading returns true when the status is loading', () => {
    const isLoading = selectUsersLoading(mockRootState);
    expect(isLoading).toBeTruthy();
  });

  test('selectUsersLoading returns false when the status is not loading', () => {
    const notLoadingState = {
      ...mockRootState,
      userSearch: {
        ...mockRootState.userSearch,
        status: 'succeeded',
      },
    } as RootState;
    const isLoading = selectUsersLoading(notLoadingState);
    expect(isLoading).toBeFalsy();
  });
});
