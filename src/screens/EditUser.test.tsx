import React from 'react';
import { render, screen } from '@testing-library/react';
import  EditUser  from './AddUser';




  const props: any = {
    handleSubmit: jest.fn(),
  };

test('Test submit for edit', () => {
    render(<EditUser {...props} />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

