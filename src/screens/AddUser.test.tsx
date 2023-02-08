import React from 'react';
import { render, screen } from '@testing-library/react';
import  AddUser  from './AddUser';




  const props: any = {
    handleSubmit: jest.fn(),
  };

test('Test submit', () => {
    render(<AddUser {...props} />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

