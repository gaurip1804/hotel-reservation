import React,{useState} from 'react';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button
  } from "@mui/material";
 
  import {ICreateBooking} from '../interface/UserRoom';

  // type userTabDataType = {
  //   userTabData :any [],
  // }

const DisplayInfoScreen:React.FC<any> = ({handleOpen, handleClose, ...userDetails}) => {
  

  
        return(
            <>
            <Container maxWidth={"lg"}
                sx={{
                  marginTop: 2,
                }}>
            <TableContainer sx={{ marginTop: 3 }}>
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                
                <TableCell align="right">First Name</TableCell>
                <TableCell align="right">Check In</TableCell>
                <TableCell align="right">Check Out</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Payment</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
                
                <TableRow
                  
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  
                  <TableCell align="right">{userDetails.firstName}</TableCell>
                  <TableCell align="right">{userDetails.stay.arrivalDate}</TableCell>
                  <TableCell align="right">{userDetails.stay.departureDate}</TableCell>
                  <TableCell align="right">{userDetails.email}</TableCell>
                  <TableCell align="right">
                  {userDetails.payment}
                  </TableCell>
                  <TableCell align="right">
                  <Button onClick={handleOpen}>View </Button>
                  <Button value={userDetails.id} onClick={handleOpen}>Edit</Button>
                  </TableCell>
                </TableRow>
              
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
        
      </>
    )

};

export default DisplayInfoScreen;