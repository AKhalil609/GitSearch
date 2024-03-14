import { useState, type KeyboardEvent } from 'react';
import {
  InputWrapper,
  StyledInput,
  StyledIcon,
  SearchIconContainer,
  ClearIconContainer,
  SearchInputContainer,
} from './styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  searchUsers,
  clearSearchResults,
} from '../../features/userSearch/userSearchSlice';
import mgGlass from '../../assets/mg-glass.svg';
import Cancel from '../../assets/cancel.svg';

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
    }
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
        <SearchIconContainer onClick={handleSearch}>
          <StyledIcon src={mgGlass} />
        </SearchIconContainer>
      </InputWrapper>
      {(username.length > 0 || users.length > 0) && (
        <ClearIconContainer onClick={handleClear}>
          <StyledIcon src={Cancel} />
        </ClearIconContainer>
      )}
    </SearchInputContainer>
  );
};

export default SearchInput;
