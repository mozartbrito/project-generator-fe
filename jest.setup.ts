import '@testing-library/jest-dom'
import 'jest-fetch-mock';
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

// Mock console.warn to suppress warnings about outdated JSX transform
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0].includes('outdated JSX transform') || args[0].includes('Image with src')) {
    return;
  }
  originalWarn(...args);
};