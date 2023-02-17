import { fireEvent, render, screen } from '@testing-library/react';
import  HomeScreen  from './HomeScreen';
import { Provider } from './../context/reservations';
import '@testing-library/jest-dom';
import { BookingModal } from '../components/BookingModal';
import {ICreateBooking} from '../interface/UserRoom';


  const props: any = {
    handleClick: jest.fn(),
  };

  const modalProps: any = {
    handleClose: jest.fn(),
    userDetails: undefined,
    open:true
  };


test('submit', () => {
    render(<Provider><HomeScreen {...props} /></Provider>);
    const linkElement = screen.getByText('Add record');
    expect(linkElement).toBeInTheDocument();
  });

  describe("Modal", () => {
    test("renders correctly", async () => {
      render(<Provider><BookingModal {...modalProps}/></Provider>);
      expect(screen.getByTestId("find-me-in-jest")).toBeVisible();
    });
});

// test("should call Add record", () => {
//     const handleClick = jest.fn();
//     render(<Provider><HomeScreen {...props} /></Provider>);
//     fireEvent.click(screen.getByText("Add record"))
//     expect(handleClick).toHaveBeenCalled();
//   });

