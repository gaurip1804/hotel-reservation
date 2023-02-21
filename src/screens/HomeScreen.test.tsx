import React from 'react';
import {render, screen } from '@testing-library/react';
import  HomeScreen  from './HomeScreen';
import { Provider } from './../context/reservations';
import '@testing-library/jest-dom';
import  BookingModal  from '../components/BookingModal';
import userEvent from '@testing-library/user-event';



  const modalProps: any = {
    open:true,
    userDetails: undefined,
    handleSubmit: jest.fn(),
    handleClose: jest.fn(),
  };


test('Add record', () => {
    render(<Provider><HomeScreen/></Provider>);
    const linkElement = screen.getAllByText('Add record')[0];
    expect(linkElement).toBeInTheDocument();
  });

  test('Go to previous page', () => {
    render(<Provider><HomeScreen/></Provider>);
    expect( screen.getAllByRole('button',{name : 'Go to previous page'})[0]).toBeInTheDocument();
    //userEvent.click(screen.getAllByRole('button', {name: 'Go to previous page'})[0]);
  });

  test('"Go to next page', () => {
    render(<Provider><HomeScreen/></Provider>);
    expect(screen.getAllByRole('button',{name : 'Go to next page'})[0]).toBeInTheDocument();
   // userEvent.click(screen.getAllByRole('button', {name: 'Go to next page'})[0]);
  });

  describe("Modal", () => {
    test("renders correctly", async () => {
      render(<Provider><BookingModal {...modalProps}/></Provider>);
      expect(screen.getByTestId("find-me-in-jest")).toBeVisible();
    });

    describe('DisplayForm Snapshot', () => {
      let  view = render(<Provider><HomeScreen {...modalProps}></HomeScreen></Provider>);
        expect(view).toMatchSnapshot();
    });

    test('testbAdd click', async () => {
        render(<Provider><HomeScreen {...modalProps} /></Provider>);
        expect(screen.getAllByRole('button',{name: 'Add record'})[0]).toBeInTheDocument();
      userEvent.click(screen.getAllByRole('button', {name: 'Add record'})[0]);
    });

});

describe('Datagrid problem repro', () => {
  it('should render rowgroup', () => {
    render(<Provider><HomeScreen {...modalProps} /></Provider>);
    expect(screen.getAllByRole('rowgroup')[0]).toBeInTheDocument();
  });

  it('should render row', () => {
    render(<Provider><HomeScreen {...modalProps} /></Provider>);
    expect(screen.getAllByRole('row')[0]).toBeInTheDocument();
  });


  it('should render columnHeader', () => {
    render(<Provider><HomeScreen {...modalProps} /></Provider>);
    expect(screen.getAllByRole('columnheader')[0]).toBeInTheDocument();
  });

  it('should render row checkbox', () => {
    render(<Provider><HomeScreen {...modalProps} /></Provider>);
    expect(screen.getAllByRole('checkbox')[0]).toBeInTheDocument();
  });

  it('should render spy functions', () => {
    const handleDelete = jest.fn();
    const handleEditClick = jest.fn();
    const handleClose = jest.fn();
    const setUsers = jest.fn();
    
    render(<Provider><HomeScreen {...modalProps} /></Provider>);
    const handleClick = jest.spyOn(React, "useState");
    handleClick.mockImplementation((reservations?: any) => [reservations, handleDelete]);
    handleClick.mockImplementation((userDetails?: any) => [userDetails, handleEditClick]);
    handleClick.mockImplementation((userDetails?: any) => [userDetails, setUsers]);
    handleClick.mockImplementation((open?: any) => [open, handleClose]);

   });


  
});
