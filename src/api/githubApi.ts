import type { Repository } from '../features/types';
// Function to fetch users based on username search
export const fetchUsers = async (username: string) => {
  try {
    const response = await fetch(
      `${
        process.env.VITE_BASE_URL || ''
      }/search/users?q=${username}+in:login&per_page=5`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Function to fetch repositories for a specific user
export const fetchRepositories = async (
  username: string,
  page: number = 1
): Promise<Repository[]> => {
  const baseUrl: string = process.env.VITE_BASE_URL || '';
  const url: string = `${baseUrl}/users/${username}/repos?per_page=20&page=${page}`;
  const response: Response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch repositories for user ${username}`);
  }

  return await response.json();
};
