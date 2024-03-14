import styled from 'styled-components';
import mgGlass from '../assets/mg-glass.svg';
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
`;

export const Icon = styled.img.attrs({
  src: mgGlass,
})`
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
`;
