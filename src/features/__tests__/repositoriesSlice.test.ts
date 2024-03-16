import { configureStore } from '@reduxjs/toolkit';
import repositoriesReducer from '../repositories/repositoriesSlice';
import { Status } from '../types';
import { initialState } from '../repositories/initialState';
import { getRepositories } from '../repositories/thunks';
import type { RootState } from '../../app/store';

describe('repositories slice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({ reducer: { repositories: repositoriesReducer } });
  });

  test('should handle initial state', () => {
    const state = store.getState() as RootState;
    expect(state.repositories).toEqual(initialState);
  });

  test('handles getRepositories.pending action', async () => {
    const username = 'testuser';
    store.dispatch({
      type: getRepositories.pending.type,
      meta: {
        arg: username,
        requestId: 'requestId',
        requestStatus: 'pending',
      },
    });

    const updatedState = store.getState() as RootState;

    expect(updatedState.repositories[username]).toEqual({
      repositories: [],
      status: Status.Loading,
      error: null,
    });
  });

  test('handles getRepositories.fulfilled action', () => {
    const username = 'testuser';
    const mockRepositories = [
      {
        id: 1,
        name: 'testRepo',
        html_url: '',
        description: '',
        stargazers_count: 0,
      },
    ];

    store.dispatch({
      type: getRepositories.fulfilled.type,
      payload: {
        username: username,
        repositories: mockRepositories,
      },
      meta: {
        arg: username,
        requestId: 'requestId',
        requestStatus: 'fulfilled',
      },
    });

    const state = store.getState() as RootState;

    expect(state.repositories[username]).toEqual({
      repositories: mockRepositories,
      status: Status.Success,
      error: null,
    });
  });

  test('handles getRepositories.rejected action', async () => {
    const username = 'testuser';
    const error = 'Fetch failed';
    const requestId = 'unique-request-id';

    const errorObj = new Error(error);

    store.dispatch(
      getRepositories.rejected(errorObj, requestId, username, undefined, {
        arg: username,
        requestId,
        requestStatus: 'rejected',
        aborted: false,
        condition: false,
      })
    );

    const updatedState = store.getState() as RootState;

    expect(updatedState.repositories[username]?.status).toEqual(Status.Failed);
    expect(updatedState.repositories[username]?.error).toEqual(error);
  });
});
