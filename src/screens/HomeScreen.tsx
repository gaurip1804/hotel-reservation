import React, { useState, useContext } from 'react';
import UserReservationContext from '../context/reservations';
import {ICreateBooking} from '../interface/UserRoom';
import  BookingModal  from '../components/BookingModal';
import { DataGrid,GridRowId,  } from '@mui/x-data-grid';
import dataColumns from './../data/dataColumns';
import {GridActionsCellItem, GridToolbarContainer }from '@mui/x-data-grid-pro';
 import AddIcon from '@mui/icons-material/Add';
 import EditIcon from '@mui/icons-material/Edit';
 import DeleteIcon from '@mui/icons-material/DeleteOutlined';
 import Button from '@mui/material/Button';



 let arr:any[] = [];

 const HomeScreen: React.FC = () => {
  const { reservations,  createReservation,editUserReservationById, deleteReservationById } =  useContext(UserReservationContext);
 
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
          id="edit"
          data-testid = "edit"
          className="textPrimary"
          onClick = {()=>handleEditClick(user)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          id="delete"
          data-testid = "delete"
          label="Delete"
         onClick={()=>handleDelete(user)}
          color="inherit"
        />,
      ]
      )
    },
  }

  arr.push(...dataColumns, abc)
  const columns = arr;
  
const [open, setOpen] = useState(false);

    const [userDetails, setUsers] = useState<ICreateBooking>()

  const handleClose = () => {setOpen(false); }
 
      
const handleEditClick = (user:any) => { 
        setUsers(user.row);
        setOpen(true);
   }

   
   const handleDelete = (user:any) => { 
    deleteReservationById(user.row.id);
    window.location.reload();
}
 
const handleSubmit = (formData:any) => {
         userDetails && userDetails !== undefined ? editUserReservationById(userDetails.id, formData) :  createReservation(formData);
        handleClose();
    }

    
   
   const EditToolbar = () => {
    const handleClick = () => {
      setUsers(undefined)
      setOpen(true)
    }

    return (
      <GridToolbarContainer> 
        <Button color="primary" startIcon={<AddIcon />} onClick = {handleClick} data-testid="trigger-me-in-jest" name="addRecord">
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }
    return(
       <>  
    <div style={{height : 100, background:'#F8A756', paddingTop: 30}}><h3>Reservation System</h3></div>
    <div style={{ height: 400, width: '100%' }}>
    
     {reservations && 
     <DataGrid
        rows={reservations}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        components={{ Toolbar: EditToolbar} }
      /> }
    </div>
 
 <div>
  
    {open && <BookingModal data-testid="bookingModal" open={open}  userDetails = {userDetails} handleSubmit = {handleSubmit} handleClose={handleClose} />}
    </div>
   
    </>
    )
};

export default HomeScreen;