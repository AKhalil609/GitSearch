import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  box-sizing: border-box;
  border-bottom: 1px rgb(107, 127, 152, 0.2) solid;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const HeadLine = styled.div`
  font-size: 30px;
  font-weight: 600;
`;

export const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  grid-gap: 8px;
  padding: 20px;
  flex-wrap: wrap;
  gap: 8px;
  box-sizing: border-box;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  flex-grow: 1;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;

    flex-grow: 0;
  }
`;

export const CarsWrapper = styled.div`
  background-image: url('https://svgshare.com/i/14S3.svg');
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: contain;
  width: 100%;
  flex-grow: 1;
`;

export const PlaceholderText = styled.div`
  font-size: 46px;
  height: 100%;
  text-align: center;
  font-weight: 200;
  display: flex;
  justify-content: center;
  align-items: center;
`;
