import 'jest-fetch-mock/setupJest';
import '@testing-library/jest-dom';

jest.mock('*.svg', () => {
  return { ReactComponent: 'svg' };
});
