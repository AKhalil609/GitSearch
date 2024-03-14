import { useState } from 'react';
import { SearchPage } from './pages/SearchPage';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <Container>
      <SearchPage />
    </Container>
  );
}

export default App;
