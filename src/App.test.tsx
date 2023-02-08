import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import HomeScreen from './screens/HomeScreen';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


it("should return a datatable", () => {
  // Arrange: prepare function arguments
  // and the expected division result.
  // In this example 10 / 2 === 5:
  //const [a, b, expected] = [10, 2, 5];
  const module = <HomeScreen></HomeScreen>
  
  // Here we use array destructuring 
  // to assing `a === 10`, `b === 2`, 
  // and `expected === 5`.
  
  // Act: use the `divide` function 
  // to get an actual function result.
  const result = React.Component;
  
  // Assert: compare expected result
  // with a function result.
  expect(result).toEqual(module);
});