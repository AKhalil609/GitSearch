import styled from 'styled-components';
import SVG from 'react-inlinesvg';
interface SVGProps {
  color: string;
}

export const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: start;
  height: auto;
  padding: 8px;
  border-radius: 50px;
  @media (max-width: 768px) {
    width: 100%;
  }
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
  background-color: var(--tertiary-bg-color);
  color: #cdd6e1;

  &::placeholder {
    color: var(--quaternary-bg-color);
    opacity: 1;
  }

  &::-webkit-input-placeholder {
    color: var(--quaternary-bg-color);
  }
  &::-moz-placeholder {
    color: var(--quaternary-bg-color);
    opacity: 1;
  }
  &:-ms-input-placeholder {
    color: var(--quaternary-bg-color);
  }
  &:-moz-placeholder {
    color: var(--quaternary-bg-color);
    opacity: 1;
  }
`;

export const StyledSVG = styled(SVG)<SVGProps>`
  transform: translateX(-50%) translateY(-50%);
  width: 25px;
  height: 25px;
  & path {
    fill: ${({ color }) => color};
  }
`;

export const SearchIconContainer = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background: none;
  padding: 26px;
  border-radius: 40px;
`;

export const ClearIconContainer = styled.button`
  right: 25px;
  top: 50%;
  width: 20px;
  height: 20px;
  background: var(--primary-btn-color);
  padding: 26px;
  border-radius: 40px;
  margin-right: 8px;
`;
