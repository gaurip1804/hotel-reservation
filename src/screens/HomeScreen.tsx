import React, { useState, useEffect, useContext } from 'react';
import UserReservationContext from '../context/reservations';
import {ICreateBooking} from '../interface/UserRoom';
import { BookingModal } from '../components/BookingModal';
import { DataGrid, GridRowId, GridRowParams, GridToolbar } from '@mui/x-data-grid';
import dataColumns from './../data/dataColumns';
import {GridActionsCellItem, GridToolbarContainer }from '@mui/x-data-grid-pro';
 import AddIcon from '@mui/icons-material/Add';
 import EditIcon from '@mui/icons-material/Edit';
 import DeleteIcon from '@mui/icons-material/DeleteOutlined';
 import Button from '@mui/material/Button';


 let arr:any[] = [];

 const HomeScreen: React.FC = () => {
 
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
    // const [firstName, setFirstName] = useState('')
    // const [lastName, setLastName] = useState('')
    // const [email, setEmail] = useState('')
     const [showEdit, setShowEdit] = useState(false);
    const { fetchAllReservations, reservations } =  useContext(UserReservationContext);

  useEffect(() => {
    fetchAllReservations();
  }, [fetchAllReservations]);

  const rows = reservations;
    
  const handleOpen = () =>  {setOpen(true); }
  const handleClose = () => {setOpen(false); }
 ;
    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
       // renderBooks();
    }

    const handleSubmitEdit = () => {
        setShowEdit(false);
      };

      
      const handleEditClick = (user:any) => {
        renderBooks(user.id);
   }
 
   const renderBooks = (id:number) => {     
    reservations.map((item:any) => {
       if(id === item.id){
          setUsers(item);
          setOpen(true);
       }
   });
   }
   
   const EditToolbar = () => {
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} >
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }
    return(
       <>  
    <div style={{height : 100, background:'#F8A756', paddingTop: 30}}><h3>Reservation System</h3></div>
    <div style={{ height: 400, width: '100%' }}>
    
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        components={{ Toolbar: EditToolbar }}
   
      />
    </div>
 <div>
    {open && userDetails && <BookingModal open={open} handleClose={handleClose} handleSubmitEdit={handleSubmitEdit} userId={userId}  userDetails = {userDetails}/>}
    </div>
    
    </>
    )
};

export default HomeScreen;