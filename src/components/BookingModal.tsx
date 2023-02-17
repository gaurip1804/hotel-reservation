import React from "react";
import {
  Modal,
  Box,
} from "@mui/material";
import { bookModalStyle } from "./../helpers/styles";
import {ICreateBooking} from '../interface/UserRoom';
import EditUser from "../screens/EditUser";
import AddUser from "../screens/AddUser";



type TReview = {
  open : boolean
  handleClose(): void
  userDetails:ICreateBooking | undefined
}

export const BookingModal:React.FC<TReview> = ({open, handleClose, userDetails }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ overflow: 'scroll' }}
    >
      <Box sx={bookModalStyle} data-testid="find-me-in-jest">
    {userDetails && userDetails !== undefined ? <EditUser handleClose = {handleClose} userDetails = {userDetails} /> :
     <AddUser handleClose = {handleClose} />}
        
      </Box>
    </Modal>
  );
 
};
