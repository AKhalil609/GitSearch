import {
  RepoContainer,
  RepoDescription,
  RepoHeader,
  RepoTitle,
  RepoWrapper,
  StarGazersHolder,
  StyledSVG,
} from './styles';
import { useAppSelector } from '../../app/hooks';
import Star from '../../assets/star.svg';
import {
  selectUserRepositories,
  selectUserRepositoriesStatus,
  selectUserRepositoriesLoading,
} from '../../features/repositories/selectors';
import { memo } from 'react';
import { Status } from '../../features/types';

interface RepoItemProps {
  repo: {
    id: number;
    name: string;
    stargazers_count: number;
    description: string;
  };
}

const RepoItem = memo(({ repo }: RepoItemProps) => (
  <RepoContainer key={repo.id}>
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

interface RepositoriesListProps {
  userLogin: string;
  expanded: boolean;
}

const RepositoriesList = ({ userLogin, expanded }: RepositoriesListProps) => {
  const repositories = useAppSelector((state) =>
    selectUserRepositories(state, userLogin)
  );
  const status = useAppSelector((state) =>
    selectUserRepositoriesStatus(state, userLogin)
  );
  const isLoading = useAppSelector((state) =>
    selectUserRepositoriesLoading(state, userLogin)
  );

  if (isLoading) return <p>Loading...</p>;
  if (status === Status.Failed) return <p>Error loading repositories.</p>;
  if (expanded && repositories.length === 0)
    return <p>There are no repos for this user.</p>;

  return (
    <RepoWrapper>
      {repositories.map((repo) => (
        <RepoItem key={repo.id} repo={repo} />
      ))}
    </RepoWrapper>
  );
};

export default RepositoriesList;
