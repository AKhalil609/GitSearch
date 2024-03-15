import { useAppSelector } from '../app/hooks';
import { UserCard } from '../components/UserCard';
import './SearchPage.scss';
import SearchInput from '../components/SearchInput';
import { CardsContainer } from '../components/UserCard/styles';

export const SearchPage = () => {
  const users = useAppSelector((state) => state.userSearch.users);

  return (
    <div className="search-page">
      <h1>GitHub User Search</h1>
      <SearchInput placeholder="Github UserName" />
      <CardsContainer>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </CardsContainer>
    </div>
  );
};
