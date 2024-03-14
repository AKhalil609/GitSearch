import { SearchPage } from './pages/SearchPage';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const App = () => {
  return (
    <Container>
      <SearchPage />
    </Container>
  );
};

export default App;
