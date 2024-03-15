import styled from 'styled-components';
import SVG from 'react-inlinesvg';

interface CardProps {
  $expanded: boolean;
}

interface SVGProps {
  color: string;
  width: string;
  height: string;
}

export const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  grid-gap: 8px;
  padding: 20px;
  flex-wrap: wrap;
  gap: 8px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CardTest = styled.div<CardProps>`
  flex-grow: 1;
  background: #323d4a;
  color: rgba(205, 214, 225, 1);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0px;
  text-decoration: none;
  text-transform: none;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 12px;
  display: flex;
  align-items: start;
  min-width: 360px;
  transition: height 0.2s ease-out;

  flex-direction: column;
  height: ${(props) => (props.$expanded ? '225px' : '45px')};
  max-height: 225px;
  @media (max-width: 768px) {
    height: ${(props) => (props.$expanded ? '600px' : '45px')};
    max-height: 600px;
  }
`;

export const CardHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const StyledIcon = styled.img<CardProps>`
  transition: transform 0.2s ease-out;
  transform: ${({ $expanded }) => ($expanded ? 'rotate(180deg)' : 'rotate(0)')};
`;

export const CardWrapper = styled.div`
  height: 225px;
  flex-grow: 1;
  transition: max-height 0.2s ease-out;
  max-width: 360px;

  @media (max-width: 768px) {
    height: auto;
    min-width: 100%;
  }
`;

export const CardTitle = styled.span`
  color: rgba(205, 214, 225, 1);
  font-family: 'Inter';
  font-style: normal;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: 0px;
  text-decoration: none;
  text-transform: none;
`;

export const StyledSVG = styled(SVG)<SVGProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  & path {
    fill: ${({ color }) => color};
  }
`;
