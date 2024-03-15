import { Status } from '../types';
import {
  selectUserRepositories,
  selectUserRepositoriesStatus,
  selectUserRepositoriesLoading,
  selectUserRepositoriesError,
} from '../repositories/selectors';
import { RootState } from '../../app/store';

describe('Repository Selectors', () => {
  const mockState: RootState = {
    userSearch: {
      users: [],
      status: 'idle',
      error: null,
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

  test('selectUserRepositories returns the repositories for a given user', () => {
    const repositories = selectUserRepositories(mockState, 'johnDoe');
    expect(repositories).toEqual(mockState.repositories.johnDoe.repositories);
  });

  test('selectUserRepositoriesStatus returns the status for a given user', () => {
    const status = selectUserRepositoriesStatus(mockState, 'johnDoe');
    expect(status).toEqual(Status.Success);
  });

  test('selectUserRepositoriesLoading returns true if status is loading for a given user', () => {
    const loadingState: RootState = {
      ...mockState,
      repositories: {
        johnDoe: {
          ...mockState.repositories.johnDoe,
          status: Status.Loading,
        },
      },
    };
    const isLoading = selectUserRepositoriesLoading(loadingState, 'johnDoe');
    expect(isLoading).toBe(true);
  });

  test('selectUserRepositoriesError returns the error for a given user', () => {
    const errorState: RootState = {
      ...mockState,
      repositories: {
        johnDoe: {
          ...mockState.repositories.johnDoe,
          error: 'Error fetching repositories',
        },
      },
    };
    const error = selectUserRepositoriesError(errorState, 'johnDoe');
    expect(error).toEqual('Error fetching repositories');
  });
});
