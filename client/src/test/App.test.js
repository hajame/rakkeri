import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders learn react links', () => {
  render(<App />);
  const loginLink = screen.getByText(/Login/i);
  expect(loginLink).toBeInTheDocument();
  const signupLink = screen.getByText(/Sign up/i);
  expect(signupLink).toBeInTheDocument();
});
