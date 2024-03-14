const BASE_URL = 'https://api.github.com';

// Function to fetch users based on username search
export const fetchUsers = async (username: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/users?q=${username}+in:login&per_page=5`
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
export const fetchRepositories = async (username: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/users/${username}/repos?per_page=100`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch repositories for user ${username}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching repositories for user ${username}:`, error);
    throw error;
  }
};
