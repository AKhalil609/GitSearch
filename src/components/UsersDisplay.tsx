import React from 'react';
import { useAppSelector } from '../app/hooks';
import { UserCard } from '../components/UserCard';
import styled from 'styled-components';

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const UsersDisplay = () => {
  const users = useAppSelector((state) => state.userSearch.users);

  return (
    <CardsContainer>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </CardsContainer>
  );
};