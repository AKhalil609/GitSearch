import { memo, useCallback, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import {
  CardWrapper,
  CardTest,
  CardHeader,
  StyledIcon,
  CardTitle,
} from './styles';
import Angle from '../../assets/angle.svg';
import type { User } from '../../features/types';
import { getRepositories } from '../../features/repositories/thunks';
import RepositoriesList from '../RepositoryList';

interface UserCardProps {
  user: User;
}

export const UserCard = memo(({ user }: UserCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    if (!expanded) {
      dispatch(getRepositories(user.login));
    }
    setExpanded((prevExpanded) => !prevExpanded);
  }, [dispatch, expanded, user.login]);

  return (
    <CardWrapper>
      <CardTest $expanded={expanded}>
        <CardHeader
          role="button"
          tabIndex={0}
          onClick={handleClick}
          aria-expanded={expanded}
        >
          <CardTitle>{user.login}</CardTitle>
          <StyledIcon
            $expanded={expanded}
            width="25px"
            height="25px"
            src={Angle}
          />
        </CardHeader>

        <RepositoriesList userLogin={user.login} expanded={expanded} />
      </CardTest>
    </CardWrapper>
  );
});
