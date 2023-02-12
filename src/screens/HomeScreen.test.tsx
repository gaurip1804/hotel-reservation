import { fireEvent, render, screen } from '@testing-library/react';
import  HomeScreen  from './HomeScreen';
import { Provider } from './../context/reservations';
import '@testing-library/jest-dom';
import { BookingModal } from '../components/BookingModal';


  const props: any = {
    handleClick: jest.fn(),
  };

  const modalProps: any = {
    handleClose: jest.fn(),
    userDetails: {},
    open:true
  };


test('Test submit', () => {
    render(<Provider><HomeScreen {...props} /></Provider>);
    const linkElement = screen.getByText('Add record');
    expect(linkElement).toBeInTheDocument();
  });

  describe("Modal", () => {
    test("renders correctly", async () => {
      render(<BookingModal {...modalProps}/>);
      expect(screen.getByTestId("find-me-in-jest")).toBeVisible();
    });
});

test("should call Add record", () => {
    const handleClick = jest.fn();
    render(<Provider><HomeScreen {...props} /></Provider>);
    fireEvent.click(screen.getByText("Add record"))
    expect(handleClick).toHaveBeenCalled();
  });

