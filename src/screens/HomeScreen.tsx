import React, { useState, useEffect, useContext } from 'react';
import UserReservationContext from '../context/reservations';
import {ICreateBooking} from '../interface/UserRoom';
import { BookingModal } from '../components/BookingModal';
import { DataGrid, GridActionsCell, GridRow, GridRowId, GridRowParams, GridToolbar } from '@mui/x-data-grid';
import dataColumns from './../data/dataColumns';
import {GridActionsCellItem, GridToolbarContainer }from '@mui/x-data-grid-pro';
 import AddIcon from '@mui/icons-material/Add';
 import EditIcon from '@mui/icons-material/Edit';
 import DeleteIcon from '@mui/icons-material/DeleteOutlined';
 import Button from '@mui/material/Button';


 let arr:any[] = [];

 const HomeScreen: React.FC = () => {
  const { reservations } =  useContext(UserReservationContext);
 
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
          className="textPrimary"
          onClick = {()=>handleEditClick(user)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
        // onClick={()=>alert(id)}
          color="inherit"
        />,
      ]
      )
    },
  }

  arr.push(...dataColumns, abc)
  const columns = arr;
  
const [open, setOpen] = useState(false);
const [userId, setUserId] = React.useState<number>(0); 



    const [userDetails, setUsers] = useState<ICreateBooking>()

  const handleClose = () => {setOpen(false); }
 
      
      const handleEditClick = (user:any) => { 
        setUsers(user.row);
        setOpen(true);
   }
 
   
   const EditToolbar = () => {
    const handleClick = () => {
      setUsers(undefined)
      setOpen(true)
    }
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick = {handleClick}>
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
  
    {open && <BookingModal open={open} handleClose={handleClose} userDetails = {userDetails}/>}
    </div>
   
    </>
    )
};

export default HomeScreen;