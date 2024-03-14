import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  getRepositories,
  selectUserRepositories,
  selectUserRepositoriesLoading,
  selectUserRepositoriesStatus,
} from '../features/repositories/repositoriesSlice';
import {
  CardWrapper,
  CardTest,
  CardTestHeader,
  RepoWrapper,
  RepoContainer,
  RepoHeader,
  RepoTitle,
  StarGazersHolder,
  RepoDescription,
  StyledIcon,
} from './styles';
import Angle from '../assets/angle.svg';
import Star from '../assets/star.svg';
import type { User } from '../features/types';

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const repositories = useAppSelector((state) =>
    selectUserRepositories(state, user.login)
  );
  const status = useAppSelector((state) =>
    selectUserRepositoriesStatus(state, user.login)
  );

  const isLoading = useAppSelector((state) =>
    selectUserRepositoriesLoading(state, user.login)
  );

  const handleClick = () => {
    if (!expanded) {
      dispatch(getRepositories(user.login));
    }
    setExpanded(!expanded);
  };

  return (
    <CardWrapper>
      <CardTest expanded={expanded}>
        <CardTestHeader onClick={handleClick}>
          <span>{user.login}</span>
          <StyledIcon
            expanded={expanded}
            width="25px"
            height="25px"
            src={Angle}
          />
        </CardTestHeader>

        <RepoWrapper>
          {isLoading && <p>Loading...</p>}
          {status === 'succeeded' && !isLoading && repositories.length > 0
            ? repositories.map((repo) => (
                <RepoContainer key={repo.id}>
                  <RepoHeader>
                    <RepoTitle>{repo.name}</RepoTitle>
                    <StarGazersHolder>
                      <span>{repo.stargazers_count}</span>
                      <img width="20px" height="20px" src={Star} alt="star" />
                    </StarGazersHolder>
                  </RepoHeader>
                  <RepoDescription>{repo.description}</RepoDescription>
                </RepoContainer>
              ))
            : !isLoading &&
              repositories.length === 0 && (
                <p>There are no repos for this user.</p>
              )}
        </RepoWrapper>
      </CardTest>
    </CardWrapper>
  );
};
