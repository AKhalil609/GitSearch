// src/pages/SearchPage.tsx
import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks'; // Make sure you have the hook set up to use dispatch with TypeScript
import { searchUsers } from '../features/userSearchSlice';
import styled from 'styled-components';
import { useAppSelector } from '../app/hooks';
import { UserCard } from '../components/UserCard';
import './SearchPage.scss'; // Assuming you have SCSS setup for global styles

const SearchInput = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

const SearchButton = styled.button`
  padding: 0.5em 1em;
  color: white;
  background-color: palevioletred;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #d45d79;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const SearchPage = () => {
  const [username, setUsername] = useState('');
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.userSearch.users);
  const handleSearch = () => {
    if (username) {
      dispatch(searchUsers(username));
    }
  };

  return (
    <div className="search-page">
      <h1>GitHub User Search</h1>
      <div>
        <SearchInput
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </div>
      <CardsContainer>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </CardsContainer>
    </div>
  );
};
