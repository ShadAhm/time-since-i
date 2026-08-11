import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the wordmark', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /time since i/i })).toBeInTheDocument();
});
