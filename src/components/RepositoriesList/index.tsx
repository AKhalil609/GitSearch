import { RepoWrapper } from './styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectUserRepositories,
  selectUserRepositoriesStatus,
  selectUserRepositoriesLoading,
  selectUserRepositoriesMaxPage,
} from '../../features/repositories/selectors';
import { useEffect, useState, useRef } from 'react';
import { Status } from '../../features/types';
import { getRepositories } from '../../features/repositories/thunks';
import { RepoItem } from './components/RepoItem';

interface RepositoriesListProps {
  userLogin: string;
  expanded: boolean;
}

/**
 * The `RepositoriesList` component displays a list of GitHub repositories for a specified user.
 * It utilizes Redux for state management and performs asynchronous fetching of repositories based on scroll position.
 *
 * Features:
 * - Infinite scrolling: Automatically fetches more repositories as the user scrolls down, if available.
 * - Displays a loading message while fetching additional repositories.
 * - Shows an error message if the fetching of repositories fails.
 * - Conditionally renders based on the `expanded` prop and the fetch status.
 *
 * @param {RepositoriesListProps} props - The props for the component.
 * @returns React functional component.
 */

const RepositoriesList = ({ userLogin, expanded }: RepositoriesListProps) => {
  const dispatch = useAppDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const repositories = useAppSelector((state) =>
    selectUserRepositories(state, userLogin)
  );
  const status = useAppSelector((state) =>
    selectUserRepositoriesStatus(state, userLogin)
  );

  const maxPage = useAppSelector((state) =>
    selectUserRepositoriesMaxPage(state, userLogin)
  );
  const isLoading = useAppSelector((state) =>
    selectUserRepositoriesLoading(state, userLogin)
  );
  const [page, setPage] = useState(1);

  // Effect to handle infinite scrolling and fetching more repositories.
  useEffect(() => {
    const handleScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const isAtBottom =
        wrapper.scrollHeight - wrapper.scrollTop <= wrapper.clientHeight + 10;

      if (isAtBottom && !isLoading && !maxPage) {
        setPage((prevPage) => {
          const nextPage = prevPage + 1;
          dispatch(getRepositories({ username: userLogin, page: nextPage }));
          return nextPage;
        });
      }
    };

    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener('scroll', handleScroll);
      return () => wrapper.removeEventListener('scroll', handleScroll);
    }
  }, [isLoading, page, dispatch, userLogin, maxPage]);

  if (status === Status.Failed) {
    return (
      <RepoWrapper>
        <p>Error loading repositories.</p>
      </RepoWrapper>
    );
  }

  if (isLoading && repositories.length === 0) {
    return (
      <RepoWrapper>
        <p>Loading...</p>
      </RepoWrapper>
    );
  }

  if (expanded && !isLoading && repositories.length === 0) {
    return (
      <RepoWrapper>
        <p>There are no repos for this user.</p>
      </RepoWrapper>
    );
  }

  return (
    <RepoWrapper ref={wrapperRef}>
      {repositories?.map((repo) => (
        <RepoItem key={repo.id} repo={repo} />
      ))}
      {isLoading && <p>Loading more...</p>}
    </RepoWrapper>
  );
};

export default RepositoriesList;
