import React from "react";
import {
  Modal,
  Box,
} from "@mui/material";
import { bookModalStyle } from "./../helpers/styles";
import {ICreateBooking} from '../interface/UserRoom';

import DisplayForm from './DisplayForm';

type TReview = {
  open : boolean
  handleSubmit:(formData:any)=>void
  userDetails:ICreateBooking | undefined
  handleClose():void
}

const BookingModal:React.FC<TReview> = ({open, handleSubmit, userDetails, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ overflow: 'scroll' }}
      data-testid="modal"
    >

      <Box sx={bookModalStyle} data-testid="find-me-in-jest">
      <DisplayForm handleSubmit = {handleSubmit} userDetails = {userDetails} />
      </Box>
    </Modal>
  );
 
};

export default BookingModal;
