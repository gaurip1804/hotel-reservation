import React from 'react';
import { render, screen } from '@testing-library/react';
import  AddUser  from './AddUser';
import { Provider } from './../context/reservations';
import '@testing-library/jest-dom'




  const props: any = {
    handleSubmit: jest.fn(),
  };

test('Test submit', () => {
    render(<Provider><AddUser {...props} /></Provider>);
    const linkElement = screen.getByText('Save');
    expect(linkElement).toBeInTheDocument();
  });

