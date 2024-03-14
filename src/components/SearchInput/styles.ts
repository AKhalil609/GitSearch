import styled from 'styled-components';

export const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: start;
  height: auto;
  padding: 20px;
  border-radius: 50px;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 20px;
  padding-right: 45px;
  font-size: 20px;
  border: none;
  border-radius: 50px;
  box-sizing: border-box;
  padding-right: 70px;
`;

export const StyledIcon = styled.img`
  transform: translateX(-50%) translateY(-50%);
  width: 25px;
  height: 25px;
`;

export const SearchIconContainer = styled.button`
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background: wheat;
  padding: 26px;
  border-radius: 40px;
`;

export const ClearIconContainer = styled.button`
  right: 25px;
  top: 50%;
  width: 20px;
  height: 20px;
  background: wheat;
  padding: 26px;
  border-radius: 40px;
`;
