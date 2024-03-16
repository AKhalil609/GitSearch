import { useState, type KeyboardEvent } from 'react';
import {
  InputWrapper,
  StyledInput,
  SearchIconContainer,
  ClearIconContainer,
  SearchInputContainer,
  StyledSVG,
} from './styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearSearchResults } from '../../features/userSearch/userSearchSlice';
import mgGlass from '../../assets/mg-glass.svg';
import Cancel from '../../assets/cancel.svg';
import { searchUsers } from '../../features/userSearch/thunks';

interface SearchInputProps {
  placeholder: string;
}

const SearchInput = ({ placeholder }: SearchInputProps) => {
  const [username, setUsername] = useState('');
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.userSearch.users);
  const handleSearch = () => {
    if (username) {
      dispatch(searchUsers(username));
      return;
    }
    dispatch(clearSearchResults());
  };

  const handleClear = () => {
    dispatch(clearSearchResults());
    setUsername('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <SearchInputContainer>
      <InputWrapper>
        <StyledInput
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
        />
        <SearchIconContainer
          aria-label="search"
          role="button"
          onClick={handleSearch}
        >
          <StyledSVG color="#6b7f98" src={mgGlass} />
        </SearchIconContainer>
      </InputWrapper>
      {(username?.length > 0 || users?.length > 0) && (
        <ClearIconContainer
          aria-label="clear"
          role="button"
          onClick={handleClear}
        >
          <StyledSVG color="#1e252e" src={Cancel} />
        </ClearIconContainer>
      )}
    </SearchInputContainer>
  );
};

export default SearchInput;
