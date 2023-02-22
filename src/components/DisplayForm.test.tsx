import React from 'react';
import { fireEvent, render, screen, act, waitFor } from '@testing-library/react';
import  DisplayForm  from './DisplayForm';
import { Provider } from './../context/reservations';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

  const props: any = {
    handleSubmit: jest.fn(),
    userDetails:undefined,
  };

  const newprops: any = {
    handleSubmit: jest.fn(),
    userDetails:{
        "stay": {
            "arrivalDate": "2021-11-02 04:00",
            "departureDate": "2021-11-04 04:00"
          },
          "room": {
            "roomSize": "presidential-suite",
            "roomQuantity": 2
          },
          "firstName": "IDM",
          "lastName": "ENG",
          "email": "idm.op@idm.com",
          "phone": "9999999999",
          "addressStreet": {
            "streetName": "IDM Street",
            "streetNumber": "1234"
          },
          "addressLocation": {
            "zipCode": "123456",
            "state": "Arkansas",
            "city": "OAKVILLE"
          },
          "extras": [
            "extraBreakfast",
            "extraTV",
            "extraWiFi"
          ],
          "payment": "cc",
          "note": "idm lab test",
          "tags": [
            "hotel",
            "booking",
            "labtest",
            "angular",
            "material"
          ],
          "reminder": true,
          "newsletter": true,
          "confirm": true,
        },
    };

describe('DisplayForm Snapshot', () => {
    let  view = render(<Provider><DisplayForm {...props}></DisplayForm></Provider>);
      expect(view).toMatchSnapshot();
  });

  it("should display required error when value is invalid",  () => {
    const onSubmit = jest.fn();
    render(<Provider><DisplayForm {...props} /></Provider>)
    fireEvent.submit(screen.getAllByTestId('submitForm')[0])
    expect(onSubmit).not.toBeCalled();
  });

  test('submit on click',  async () => {
    render(<Provider><DisplayForm {...newprops} /></Provider>);
    await waitFor(() => { 
     new Promise(()=>userEvent.click(screen.getAllByRole('button', {name: 'Save'})[0])) 
  })  
})


  test("should submit the form with confirmation", async () => {
    render(<Provider><DisplayForm {...newprops}/></Provider>)
    await waitFor(() => { new Promise (()=>{
      userEvent.click(screen.getAllByTestId("confirm")[0])
      userEvent.click(screen.getAllByRole('button', {name: 'Save'})[0]);
    })
    })
  });

  describe('SampleForm', () => {
    test('Input value should be equal first name', () => {
       render(<Provider><DisplayForm {...props} /></Provider>);
        const input =  screen.getAllByRole('textbox', {name : 'firstName'})[0] as HTMLInputElement;
         userEvent.type(input, 'hello ')
        expect(input.value).toBe('hello '); 
      });

      test('Input value should be equal last name', () => {
        render(<Provider><DisplayForm {...props} /></Provider>);
         const input =  screen.getAllByRole('textbox', {name : 'lastName'})[0] as HTMLInputElement;
          userEvent.type(input, ' world')
         expect(input.value).toBe(' world'); 
       });
    

    test('Input value should be equal email', () => {
      render(<Provider><DisplayForm {...props} /></Provider>);
       const input =  screen.getAllByRole('textbox', {name : 'email'})[0] as HTMLInputElement;
        userEvent.type(input, 'hello@world.com')
       expect(input.value).toBe('hello@world.com'); 
     });
 

  test('Input value should be equal Phone number', () => {
    render(<Provider><DisplayForm {...props} /></Provider>);
     const input =  screen.getAllByRole('spinbutton', {name : 'mobNum'})[0] as HTMLInputElement;
      userEvent.type(input, '123456789')
     expect(input.value).toBe('123456789'); 
   });

   test('Input value should check confirm', () => {
    render(<Provider><DisplayForm {...props} /></Provider>);
     const input =  screen.getAllByRole('checkbox', {name : 'confirm'})[0] as HTMLInputElement;
      userEvent.type(input, 'on')
     expect(input.value).toBe('on'); 
   });

   test("should be able to onchange newsletter", () => {
    render(<Provider><DisplayForm {...props} /></Provider>);
    const input = screen.getAllByRole('checkbox', {name : 'newsletter'})[0] as HTMLInputElement;

    fireEvent.change(screen.getAllByRole('checkbox', {name : 'newsletter'})[0], { target: { value: 'on' } });
    expect(input.value).toBe('on');
   })

    test("should be able to onchange reminder", () => {
      render(<Provider><DisplayForm {...props} /></Provider>);
      const input = screen.getAllByRole('checkbox', {name : 'reminder'})[0] as HTMLInputElement;
  
      userEvent.type(input, 'on')
      expect(input.value).toBe('on');
  
  })

   test('Input value should check payment button clicked',  () => {
    render(<Provider><DisplayForm {...props} /></Provider>);
     const input =  screen.getAllByRole('radio', {name : 'Cash'})[0] as HTMLInputElement;
      userEvent.type(input, 'cash')
     expect(input.value).toBe('cash'); 
   });

   test('Input value should check State/Country',  () => {
    render(<Provider><DisplayForm {...props} /></Provider>);
     const input =  screen.getAllByRole('combobox', {name : 'Country'})[0] as HTMLInputElement;
      userEvent.type(input, 'Andorra')
     expect(input.value).toBe('Andorra'); 
   });


   it("should spy functions and states", () => {
    const setRoomQuantity = jest.fn();
    const setUserStreetNum = jest.fn();
    const handleNewsletter = jest.fn();
    const handleChangeRoom = jest.fn();
    const handleStreetChange = jest.fn();
    const handleCityChange = jest.fn();
    const handleZipCodeChange = jest.fn();
    const setInputValue = jest.fn();
    const setState = jest.fn();
    const handleSetNote = jest.fn();
    const setArrivalDate = jest.fn();
    const setDepartureDate = jest.fn();
    const handleChangeExtra = jest.fn();
    const setExtraName = jest.fn();
    const setRoomSize = jest.fn();

    
    
    render(<Provider><DisplayForm {...props} /></Provider>);
    const handleClick = jest.spyOn(React, "useState");
    handleClick.mockImplementation((roomQuantity?: number) => [roomQuantity, setRoomQuantity]);
    handleClick.mockImplementation((streetNum?: number) => [streetNum, setUserStreetNum]);
    handleClick.mockImplementation((newsletter?: boolean) => [newsletter, handleNewsletter]);
    handleClick.mockImplementation((roomSize?: string) => [roomSize, handleChangeRoom]);
    handleClick.mockImplementation((roomSize?: string) => [roomSize, setRoomSize]);
    handleClick.mockImplementation((userStreet?: string) => [userStreet, handleStreetChange]);
    handleClick.mockImplementation((setUserCity?: string) => [setUserCity, handleCityChange]);
    handleClick.mockImplementation((userZipcode?: string) => [userZipcode, handleZipCodeChange]);
    handleClick.mockImplementation((state?: string) => [state, setState]);
    handleClick.mockImplementation((inputValue?: string) => [inputValue, setInputValue]);
    handleClick.mockImplementation((note?: string) => [note, handleSetNote]);
    handleClick.mockImplementation((arrivalDate?: string) => [arrivalDate, setArrivalDate]);
    handleClick.mockImplementation((departureDate?: string) => [departureDate, setDepartureDate]);
    handleClick.mockImplementation((extraName?: []) => [extraName, handleChangeExtra]);
    handleClick.mockImplementation((extraName?: []) => [extraName, setExtraName]);

    
    
    const input =  screen.getAllByRole('spinbutton', {name : 'Room Quantity'})[0] as HTMLInputElement;
    userEvent.type(input, '1')

    const input1 =  screen.getAllByRole('spinbutton', {name : 'Street Number'})[0] as HTMLInputElement;
    userEvent.type(input1, '1')

    const input3 = screen.getAllByRole('checkbox', {name : 'newsletter'})[0] as HTMLInputElement;
    userEvent.type(input3, 'on')

    const input4 = screen.getAllByRole('button', {name : 'roomSize'})[0] as HTMLInputElement;
    userEvent.type(input4,"business-suite");

    const input5 = screen.getAllByTestId('streetName')[0] as HTMLInputElement;
    userEvent.type(input5, 'abcd')
    fireEvent.change(input5, { target: { value: "abcd" } });

    const input6 = screen.getAllByTestId('city')[0] as HTMLInputElement;
    userEvent.type(input6, 'Toronto')
    fireEvent.change(input6, { target: { value: "Toronto" } });
  });

  const input7 = screen.getAllByTestId('zip')[0] as HTMLInputElement;
  userEvent.type(input7, 'Nu48866')
  fireEvent.change(input7, { target: { value: "Nu48866" } });

  const input8 = screen.getAllByRole('combobox', {name : 'Country'})[0] as HTMLInputElement;
  userEvent.type(input8, 'Andorra');
  fireEvent.change(input8, { target: { value: "Andorra" } });

  const input9 = screen.getAllByTestId('personalNote')[0] as HTMLInputElement;
  userEvent.type(input9, 'Clean bedsheets')
  fireEvent.change(input9, { target: { value: "Clean bedsheets" } });

  const input10 = screen.getAllByTestId('arrivalDate')[0] as HTMLInputElement;
  userEvent.type(input10, '2023-02-24T04:12')
  fireEvent.change(input10, { target: { value: "2023-02-24T04:12" } });
  
  const input11 = screen.getAllByTestId('departureDate')[0] as HTMLInputElement;
  userEvent.type(input11, '2023-02-24T04:12')
  fireEvent.change(input11, { target: { value: "2023-03-24T04:12" } });

  const input12 = screen.getAllByRole('combobox', {name : 'Multiple values'})[0] as HTMLInputElement;
  userEvent.type(input12, 'booking');

  const input13 = screen.getAllByRole('button', {name : 'extras'})[0] as HTMLInputElement;
    userEvent.type(input13,"extraParking")
});

 
  
