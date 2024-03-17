import { fetchUsers, fetchRepositories } from '../githubApi';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('fetchUsers', () => {
  it('fetches users successfully from GitHub API', async () => {
    const users = [
      { login: 'testuser', id: 1, avatar_url: 'http://avatar.url' },
    ];
    fetchMock.mockResponseOnce(JSON.stringify({ items: users }));

    const response = await fetchUsers('testuser');
    expect(response.items).toEqual(users);
    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toContain(
      `${process.env.VITE_BASE_URL}/search/users?q=testuser`
    );
  });

  it('handles fetch error for users', async () => {
    fetchMock.mockReject(new Error('API is down'));

    await expect(fetchUsers('testuser')).rejects.toThrow('API is down');
    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toContain(
      `${process.env.VITE_BASE_URL}/search/users?q=testuser`
    );
  });
});

describe('fetchRepositories', () => {
  it('fetches repositories successfully from GitHub API', async () => {
    const repositories = [
      {
        id: 1,
        name: 'testrepo',
        html_url: 'http://repo.url',
        description: 'Test Repo',
      },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(repositories));

    const response = await fetchRepositories('testuser');
    expect(response).toEqual(repositories);
    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toContain(
      `${process.env.VITE_BASE_URL}/users/testuser/repos`
    );
  });

  it('handles fetch error for repositories', async () => {
    fetchMock.mockReject(new Error('API is down'));

    await expect(fetchRepositories('testuser')).rejects.toThrow('API is down');
    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toContain(
      `${process.env.VITE_BASE_URL}/users/testuser/repos`
    );
  });
});
