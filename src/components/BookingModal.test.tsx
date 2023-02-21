import { render } from '@testing-library/react';
import  BookingModal  from './BookingModal';
import { Provider } from './../context/reservations';
import '@testing-library/jest-dom';



const props: any = {
    open : true,
    handleSubmit: jest.fn(),
    userDetails:undefined
  };


describe('DisplayForm Snapshot', () => {
    test('render', async () => {
        let  view = render(<Provider><BookingModal {...props}></BookingModal></Provider>);
        expect(view).toMatchSnapshot();
    })
  });