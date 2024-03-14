import styled from 'styled-components';

interface CardProps {
  expanded: boolean;
}

export const CardsContainerTest = styled.div`
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
  background: #fff;
  color: #000;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 12px;
  display: flex;
  align-items: start;
  min-width: 360px;
  transition: height 0.2s ease-out;

  flex-direction: column;
  height: ${(props) => (props.expanded ? '225px' : '45px')};
  max-height: 225px;
  @media (max-width: 768px) {
    height: ${(props) => (props.expanded ? '600px' : '45px')};
    max-height: 600px;
    /* min-width: 100%; */
  }
`;

export const CardTestHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const RepoContainer = styled.div`
  background: gray;
  width: 97%;
  box-sizing: border-box;
  padding: 8px;
  border-radius: inherit;
  display: flex;
  margin-top: 12px;
  min-height: 130px;
  display: flex;
  flex-direction: column;
`;

export const RepoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: 100%;
  border-radius: inherit;
  margin-left: 12px;
`;

export const StyledIcon = styled.img<CardProps>`
  transition: transform 0.2s ease-out;
  transform: ${(props) => (props.expanded ? 'rotate(-180deg)' : 'initial')};
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

export const RepoHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const RepoTitle = styled.h3`
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const StarGazersHolder = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
export const RepoDescription = styled.div`
  overflow: auto;
`;
