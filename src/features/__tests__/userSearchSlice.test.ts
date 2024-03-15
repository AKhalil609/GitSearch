import userSearchReducer, {
  clearSearchResults,
} from '../userSearch/userSearchSlice';
import { searchUsers } from '../userSearch/thunks';
import { Status, type User } from '../types';
import { initialState } from '../userSearch/initialState';
import { RootState } from '../../app/store';

describe('userSearchSlice', () => {
  it('should return the initial state', () => {
    expect(userSearchReducer(undefined, { type: 'undefined' })).toEqual(
      initialState
    );
  });

  it('handles clearSearchResults action', () => {
    const mockRootState: RootState = {
      userSearch: {
        users: [
          {
            id: 1,
            login: 'johndoe',
            avatar_url: 'http://example.com/avatar.jpg',
          },
        ],
        status: Status.Success,
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
    } as RootState;
    expect(
      userSearchReducer(mockRootState.userSearch, clearSearchResults())
    ).toEqual(initialState);
  });

  it('handles searchUsers.pending action', () => {
    const action = { type: searchUsers.pending.type };
    const state = userSearchReducer(initialState, action);
    expect(state).toEqual({ ...initialState, status: 'loading' });
  });

  it('handles searchUsers.fulfilled action', () => {
    const users = [{ id: 1, login: 'John Doe' } as User];
    const action = { type: searchUsers.fulfilled.type, payload: users };
    const state = userSearchReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: 'succeeded',
      users: users,
    });
  });

  it('handles searchUsers.rejected action', () => {
    const error = 'Fetch failed';
    const action = {
      type: searchUsers.rejected.type,
      error: { message: error },
    };
    const state = userSearchReducer(initialState, action);
    expect(state).toEqual({ ...initialState, status: 'failed', error: error });
  });
});
