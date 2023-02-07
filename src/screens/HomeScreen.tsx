import React, { useState, useEffect, useContext } from 'react';
import BooksContext from '../context/users';
import {
    TextField,Button
} from '@mui/material';
import { Grid } from "@mui/material";
import DisplayInfoScreen from './DisplayInfoScreen';
// import { BookingModal } from '../components/BookingModal';
import {ICreateBooking} from '../interface/UserRoom';
import { BookingModal } from '../components/BookingModal';

 const HomeScreen: React.FC = () => {

     
const [open, setOpen] = useState(false);
const [userId, setUserId] = React.useState<number>(0); 



    const [userDetails, setUsers] = useState<ICreateBooking>()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [showEdit, setShowEdit] = useState(false);
    const { fetchBooks, books } =  useContext(BooksContext);

    const renderBooks = () => {
        books.map((item:any) => {
             if(email === item.email){
                setUsers(item);
                
             }
         });
      };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

    
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
        </div>
        <div>
          {userDetails && <DisplayInfoScreen handleOpen= {handleOpen} handleClose={handleClose} {...userDetails} />} 
         </div>

         {open && userDetails && <BookingModal open={open} handleClose={handleClose} handleSubmitEdit={handleSubmitEdit} userId={userId}  userDetails = {userDetails}/>}
       
    </>
    )
};

export default HomeScreen;