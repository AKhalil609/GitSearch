import 'jest-fetch-mock/setupJest';
import '@testing-library/jest-dom';

jest.mock('*.svg', () => '<svg>Mock SVG</svg>');
