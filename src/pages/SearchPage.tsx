import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { searchUsers, clearSearchResults  } from '../features/userSearchSlice';
import styled from 'styled-components';
import { useAppSelector } from '../app/hooks';
import { UserCard } from '../components/UserCard';
import './SearchPage.scss';

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

const ClearButton = styled.button`
  padding: 0.5em 1em;
  color: white;
  background-color: #874e61;
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

  const handleClear = () => {
    dispatch(clearSearchResults());
    setUsername('');
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
        <ClearButton onClick={handleClear}>Clear</ClearButton>
      </div>
      <CardsContainer>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </CardsContainer>
    </div>
  );
};
