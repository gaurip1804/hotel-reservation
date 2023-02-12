import React from 'react';
import { render, screen } from '@testing-library/react';
import  EditUser  from './AddUser';
import { Provider } from './../context/reservations';
import '@testing-library/jest-dom'




  const props: any = {
    handleSubmitEdit: jest.fn(),
    userDetails : {}
  };

test('Test submit for edit', () => {
    render(<Provider><EditUser {...props} /></Provider>);
    const linkElement = screen.getByText('Save');
    expect(linkElement).toBeInTheDocument();
  });

