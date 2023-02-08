import React, { useState, useEffect, useContext } from 'react';
import UserReservationContext from '../context/reservations';
import {
    TextField,Button
} from '@mui/material';
import { Grid } from "@mui/material";
import DisplayInfoScreen from './DisplayInfoScreen';
// import { BookingModal } from '../components/BookingModal';
import {ICreateBooking} from '../interface/UserRoom';
import { BookingModal } from '../components/BookingModal';

// const columns = [
//   { field: 'id', headerName: 'ID', width: 90 },
//   {
//     field: 'firstName',
//     headerName: 'First name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'lastName',
//     headerName: 'Last name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 110,
//     editable: true,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params:any) =>
//       `${params.getValue(params.id, 'firstName') || ''} ${
//         params.getValue(params.id, 'lastName') || ''
//       }`,
//   },
// ];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

 const HomeScreen: React.FC = () => {

     
const [open, setOpen] = useState(false);
const [userId, setUserId] = React.useState<number>(0); 



    const [userDetails, setUsers] = useState<ICreateBooking>()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [showEdit, setShowEdit] = useState(false);
    const { fetchAllReservations, reservations } =  useContext(UserReservationContext);

    const renderBooks = () => {
        reservations.map((item:any) => {
             if(email === item.email){
                setUsers(item);
                
             }
         });
      };

  useEffect(() => {
    fetchAllReservations();
  }, [fetchAllReservations]);

    
  const handleOpen = () =>  {setOpen(true); }
  const handleClose = () => {setOpen(false); }
    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        renderBooks();
    }

    const handleSubmitEdit = () => {
        setShowEdit(false);
      };
    return(
       <>
         <div>
             <form onSubmit={handleSubmit}>
            <Grid container display="row">
                <Grid item xs={3} >
                <TextField 
                id="firstName"
                name="firstName"
                label="First name"
                type="text"
                variant="standard"
                value={firstName || ''}
                onChange={(e)=> setFirstName(e.target.value)} />
                </Grid>

                <Grid item xs={3}>
                <TextField 
                id="lastName"
                name="lastName"
                label="Last name"
                type="text"
                variant="standard"
                value={lastName || ''}
                onChange={(e)=> setLastName(e.target.value)} />
                </Grid>

                <Grid item xs={3}>
                <TextField 
                id="email"
                name="email"
                label="Email"
                type="email"
                variant="standard"
                value={email || ''}
                onChange={(e)=> setEmail(e.target.value)} />
                </Grid>

                <Button variant="contained" color="primary" type="submit" 
                style={{
                            marginTop: "20px"
                        }}>
                            Search
                        </Button>
        </Grid>
        </form> 

{/* <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div> */}
        </div>
        <div>
          {userDetails && <DisplayInfoScreen handleOpen= {handleOpen} handleClose={handleClose} {...userDetails} />} 
         </div>

         {open && userDetails && <BookingModal open={open} handleClose={handleClose} handleSubmitEdit={handleSubmitEdit} userId={userId}  userDetails = {userDetails}/>}
       
    </>
    )
};

export default HomeScreen;