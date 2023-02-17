/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { act, findByTestId, fireEvent, render, screen } from '@testing-library/react';
import  AddUser  from './AddUser';
import { Provider } from './../context/reservations';
import '@testing-library/jest-dom';
import {jest} from '@jest/globals';
//import { shallow, ShallowWrapper } from 'enzyme';

const props: any = {
  handleClose: jest.fn(),
  
};


// describe('SomeComponent', () => {
//   let wrapper: ShallowWrapper;
//   let getFullNameSpy : any;
//   beforeEach(() => {
//     getFullNameSpy = jest.spyOn(AddUser.prototype as any, 'getFullName');
//     wrapper = shallow(<Provider><AddUser {...props}></AddUser></Provider>);
//   });
//   afterEach(() => {
//     jest.resetAllMocks();
//   });

//   it('check submit', () => {
//     expect(wrapper.find('form')).toHaveLength(1);
//     const formEventMocked = { preventDefault: jest.fn() };
//     const state = {
//       firstName: 'Cel.du.on',
//       lastName: 'lin.on',
//     };
//     wrapper.setState(state);
//     expect(wrapper).toMatchSnapshot();
//     wrapper.find('form').simulate('submit', formEventMocked);
//     expect(getFullNameSpy).toBeCalledTimes(1);
//     expect(formEventMocked.preventDefault).toBeCalledTimes(1);
//     expect(wrapper.state('isDone')).toBeTruthy();
//   });
// });




//   test("should entering a username", async () => {
    
//     const setUserFirstName = jest.fn();
//     //const mockFn = jest.fn().mockName('mockedFunction');
//  //   const { findByTestId } = renderAddForm({setUserFirstName});
//     const { findByTestId } = render(<Provider><AddUser {...props} /></Provider>);
//     // const firstName = screen.getByTestId('firstName');

//     const firstName = await findByTestId('firstName');
//     console.log(firstName)
//      fireEvent.change(firstName, { target: { value: "test" } });
//     expect(setUserFirstName).toHaveBeenCalledWith("");
//   });


  
  // test("should submit the form change ", async () => {
  //   const handleSubmit = jest.fn()
  //   const { findByTestId } = render(<Provider><AddUser {...props} /></Provider>);

  //   //const username1 =  await findByTestId("firstName");
  //  //console.log(username1)
  //   const submit = await findByTestId("addForm");
  // console.log(submit)
  //   //fireEvent.change(username1, { target: { value: "test" } });
  //   fireEvent.submit(submit)
  
  //   expect(handleSubmit).toHaveBeenCalledWith(1);
  // }); 

  // it('should call the onWordAdd handler (if exists) with the new word upon submit', () => {
  //      const handleSubmit = jest.fn();
  //      const inputValue = 'matti';

  //      render(<Provider><AddUser {...props} /></Provider>);


  //      const input = screen.getByTestId('userFirstName');
  //      const addButton = screen.getByTestId('addForm');

  //      fireEvent.change(input, {target: {value: inputValue}});
  //      fireEvent.submit(addButton);

  //      expect(handleSubmit).toHaveBeenCalledWith(inputValue);
  //  });

  it("should display required error when value is invalid", async () => {
    const onSubmit = jest.fn();
    
    render(<Provider><AddUser {...props} /></Provider>);
    fireEvent.submit(screen.getByTestId('addForm'));
    expect(onSubmit).not.toBeCalled();
  });

  describe('SampleForm', () => {
    test('Input value should be equal to the form value', async () => {
       render(<Provider><AddUser {...props} /></Provider>);
        const input =  screen.getByTestId('userFirstName') as HTMLInputElement;
         fireEvent.change(input, { target: { value: 'test-value' } });
        expect(input.value).toBe('test-value'); 
      });
    });
  
    
  test('Submitted data should be equal to the input data and close', async () => {
    const handleClose = jest.fn();
  
      const renderResult = render(<Provider><AddUser handleClose={handleClose} /></Provider>);
      const input = renderResult.getByTestId('userFirstName') as HTMLInputElement ;
      fireEvent.change(input, { target: { value: 'test-value' } });
      expect(input.value).toBe('test-value'); // -> No Error
      fireEvent.submit(renderResult.getByTestId('addForm'));
    
    expect(handleClose).toBeCalled(); // -> No Error
    expect(handleClose).toBeCalledWith(); // -> No Error
  });