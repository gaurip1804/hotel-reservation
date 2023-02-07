import React from "react";
import "react-date-range/dist/styles.css"; //
import "react-date-range/dist/theme/default.css";
import {
  Modal,
  Box,
} from "@mui/material";
import { bookModalStyle } from "./../helpers/styles";
import {ICreateBooking} from '../interface/UserRoom';
//import UserInfo from './../screens/UserInfo';
import EditUser from "../screens/EditUser";



type TReview = {
  open : boolean
  handleClose(): void
  userId:number | null
  userDetails:ICreateBooking
  handleSubmitEdit(): void
}



export const BookingModal:React.FC<TReview> = ({open, handleClose, handleSubmitEdit, userId, userDetails }) => {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ overflow: 'scroll' }}
    >
      <Box sx={bookModalStyle}>
        

        {/* <UserInfo {...userDetails} /> */}
        <EditUser handleSubmitEdit = {handleClose} userDetails = {userDetails} />
         
        
      </Box>
    </Modal>
  );
 
};
