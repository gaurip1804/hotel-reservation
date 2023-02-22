import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import  HomeScreen  from './HomeScreen';
import { Provider } from './../context/reservations';
import '@testing-library/jest-dom';
import  BookingModal  from '../components/BookingModal';
import userEvent from '@testing-library/user-event';
import { DataGrid,GridRowId,  } from '@mui/x-data-grid';
import dataColumns from './../data/dataColumns';
import {GridActionsCellItem }from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';
 import DeleteIcon from '@mui/icons-material/DeleteOutlined';



  const modalProps: any = {
    open:true,
    userDetails: undefined,
    handleSubmit: jest.fn(),
    handleClose: jest.fn(),
  };

  let arr:any[] = [];
  const rows=[
    {
      "stay": {
        "arrivalDate": "2021-11-01T04:00",
        "departureDate": "2021-11-04T04:00"
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
      "id": 1
    },]
  const abc =  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 170,
    cellClassName: 'actions',
    editable:true,
    getActions: (user: GridRowId) => {
      return (
      [
        <GridActionsCellItem
        icon={<EditIcon />}
          label="Edit"
          name = "Edit"
          id="edit"
          className="textPrimary"
          color="inherit"
        />,
        <GridActionsCellItem
        icon={<DeleteIcon />}
          id="delete"
          name = "delete"
          label="Delete"
          color="inherit"
        />,
      ]
      )
    },
  }

  arr.push(...dataColumns, abc)
  const columns = arr;

  let component:any;
  const setup = () => {
    component = render(<Provider><HomeScreen {...modalProps}><DataGrid rows={rows} columns={columns}/></HomeScreen></Provider>);
  }

  beforeEach(() => {
    setup();
  });

  test('Home Div', () => {
    render(<Provider><HomeScreen/></Provider>);
    const linkElement = screen.getAllByTestId('homeDiv')[0]
    expect(linkElement).toBeInTheDocument();
  });

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
    test("renders correctly", () => {
      render(<Provider><BookingModal {...modalProps}/></Provider>);
      expect(screen.getByTestId("find-me-in-jest")).toBeVisible();
    });

      describe('DisplayForm Snapshot', () => {
        it('should render the component against default mockdata', () => {
        expect(component.asFragment()).toMatchSnapshot();
        });
    });

    test('testbAdd click', async () => {
        render(<Provider><HomeScreen {...modalProps} /></Provider>);
        expect(screen.getAllByRole('button',{name: 'Add record'})[0]).toBeInTheDocument();
        await waitFor(() => { new Promise (()=>{
        userEvent.click(screen.getAllByRole('button', {name: 'Add record'})[0]);
        })
      })
    });

});

describe('Datagrid problem repro', () => {
  it('should render rowgroup', () => {
    render(<Provider><HomeScreen {...modalProps} /></Provider>);
    expect(screen.getAllByRole('rowgroup')[0]).toBeInTheDocument();
   
  });


  it('should render datagrid', () => {
    render(<Provider><HomeScreen {...modalProps} /></Provider>);
    expect(screen.getAllByRole('grid')[0]).toBeInTheDocument();
  });


  it('should render row', () => {
    render(<Provider><HomeScreen {...modalProps} /></Provider>);
    expect(screen.getAllByRole('row')[0]).toBeInTheDocument();
    expect(screen.getAllByRole('row', {name: 'Select all rows ID First name'})[0]).toBeInTheDocument();
  });


  it('should render columnHeader', () => {
    render(<Provider><HomeScreen {...modalProps} /></Provider>);
    expect(screen.getAllByRole('columnheader')[0]).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader', {name: 'Select all rows'})[0]).toBeInTheDocument();
  });

  it('should render row checkbox', () => {
    render(<Provider><HomeScreen {...modalProps} /></Provider>);
    expect(screen.getAllByRole('checkbox')[0]).toBeInTheDocument();
  });

  it('should render spy functions', async () => {
    const handleDelete = jest.fn();
    const handleEditClick = jest.fn();
    const handleClose = jest.fn();
    const setUsers = jest.fn();
    const handleClick= jest.fn();
    const setOpen= jest.fn();

    
    render(<Provider><HomeScreen {...modalProps} /></Provider>);
    const handleClick1 = jest.spyOn(React, "useState");
    handleClick1.mockImplementation((reservations?: any) => [reservations, handleDelete]);
    handleClick1.mockImplementation((userDetails?: any) => [userDetails, handleEditClick]);
    handleClick1.mockImplementation((userDetails?: any) => [userDetails, setUsers]);
    handleClick1.mockImplementation((open?: any) => [open, handleClose]);
    handleClick1.mockImplementation((open?: any) => [open, handleClick]);
    await waitFor(() => { new Promise (()=>{
     userEvent.click(screen.getAllByText('Add record')[0],setOpen(true))
     userEvent.click(screen.getAllByRole('button', {name: 'Save'})[0]);
    })
  })
   });
});
