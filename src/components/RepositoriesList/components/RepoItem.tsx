import React from 'react';
import {
  RepoContainer,
  RepoDescription,
  RepoHeader,
  RepoTitle,
  StarGazersHolder,
  StyledSVG,
} from '../styles';
import Star from '../../../assets/star.svg';
import type { Repository } from '../../../features/types';

interface RepoItemProps {
  repo: Repository;
}

export const RepoItem = React.memo(({ repo }: RepoItemProps) => (
  <RepoContainer>
    <RepoHeader>
      <RepoTitle>{repo.name}</RepoTitle>
      <StarGazersHolder>
        <span>{repo.stargazers_count}</span>
        <StyledSVG width="22" height="22" color="#6b7f98" src={Star} />
      </StarGazersHolder>
    </RepoHeader>
    <RepoDescription>{repo.description}</RepoDescription>
  </RepoContainer>
));
