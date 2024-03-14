import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getRepositories, selectUserRepositories, selectUserRepositoriesStatus } from '../features/repositoriesSlice';
import styled from 'styled-components';

const Card = styled.div`
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
`;

const RepoList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
`;

const RepoItem = styled.li`
  margin-bottom: 0.5rem;
`;

export const UserCard = ({ user }) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const repositories = useAppSelector((state) => selectUserRepositories(state, user.login));
  const status = useAppSelector((state) => selectUserRepositoriesStatus(state, user.login));

  const handleClick = () => {
    if (!expanded) {
      dispatch(getRepositories(user.login));
    }
    setExpanded(!expanded);
  };

  return (
    <Card onClick={handleClick}>
      <h2>{user.login}</h2>
      {expanded && (
        <RepoList>
          {status === 'loading' && <p>Loading...</p>}
          {status === 'succeeded' &&
            repositories.map((repo) => (
              <RepoItem key={repo.id}>
                <strong>{repo.name}</strong> - {repo.description} - {repo.stargazers_count}
              </RepoItem>
            ))}
          {status === 'failed' && <p>Failed to load repositories.</p>}
        </RepoList>
      )}
    </Card>
  );
};
