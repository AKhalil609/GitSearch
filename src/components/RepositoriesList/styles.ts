import styled from 'styled-components';
import SVG from 'react-inlinesvg';

interface SVGProps {
  color: string;
  width: string;
  height: string;
}

export const RepoHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const RepoTitle = styled.h4`
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 82%;
`;
export const StarGazersHolder = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: rgba(205, 214, 225, 1);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0px;
`;
export const RepoDescription = styled.div`
  overflow: auto;
  color: rgba(107, 127, 152, 1);
  font-family: 'Inter';
  font-style: normal;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: 0px;
  text-decoration: none;
  text-transform: none;
  margin-top: 4px;
`;

export const StyledSVG = styled(SVG)<SVGProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  & path {
    fill: ${({ color }) => color};
  }
`;

export const RepoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: 100%;
  border-radius: inherit;
  margin-left: 12px;
`;

export const RepoContainer = styled.div`
  background: var(--main-bg-color);
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  border-radius: inherit;
  display: flex;
  margin-top: 12px;
  min-height: 130px;
  display: flex;
  flex-direction: column;
`;
