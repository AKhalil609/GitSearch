import { useAppSelector } from '../app/hooks';
import { UserCard } from '../components/UserCard';
import SearchInput from '../components/SearchInput';
import {
  CardsContainer,
  CarsWrapper,
  HeadLine,
  HeaderWrapper,
  PageContainer,
  PlaceholderText,
} from './styles';

export const SearchPage = () => {
  const users = useAppSelector((state) => state.userSearch.users);

  return (
    <PageContainer>
      <HeaderWrapper>
        <HeadLine>GitHub User Search</HeadLine>
        <SearchInput placeholder="Github UserName" />
      </HeaderWrapper>
      <CarsWrapper>
        {users.length ? (
          <CardsContainer>
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </CardsContainer>
        ) : (
          <PlaceholderText>Please Use the SearchBar</PlaceholderText>
        )}
      </CarsWrapper>
    </PageContainer>
  );
};
