import React  from "react";
import "react-date-range/dist/styles.css"; //
import "react-date-range/dist/theme/default.css";
import {
  FormControl,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Stack,
  Switch,
  Checkbox,
} from "@mui/material";
import { Grid} from "@mui/material";
import {ICreateBooking} from '../interface/UserRoom';


 const UserInfo:React.FC<ICreateBooking> = ({...userDetails}) => {
    return(
        <Grid container display="row">
        <Grid item xs={6} alignItems="left" >
        <TextField 
                id="roomQuantity"
                name="roomQuantity"
                label="Room Size"
                type="string"
                variant="standard"
                value={userDetails.room.roomSize}
                inputProps={
                    { readOnly: true }
                }
                />
        </Grid>

        <Grid item xs={6} alignItems="left" >
        <TextField 
                id="roomQuantity"
                name="roomQuantity"
                label="Room Quantity"
                type="number"
                variant="standard"
                value={userDetails.room.roomQuantity}
                inputProps={
                    { readOnly: true }
                }
                />
        </Grid>
        <Grid item xs={12} alignItems="left" >
                <TextField 
                id="firstName"
                name="firstName"
                label="First Name"
                type="text"
                variant="standard"
                value={userDetails.firstName}
                inputProps={
                    { readOnly: true }
                }
                />
        </Grid>

        <Grid item xs={12} alignItems="left" >
                <TextField 
                id="lastName"
                name="lastName"
                label="Last Name"
                type="text"
                variant="standard"
                value={userDetails.lastName}
                inputProps={
                { readOnly: true }
                }
                />
        </Grid>

        <Grid item xs={12} alignItems="left" >
                <TextField 
                id="email"
                name="email"
                label="Email"
                type="email"
                variant="standard"
                value={userDetails.email}
                inputProps={
                    { readOnly: true }
                }
                />
        </Grid>

        <Grid item xs={12} alignItems="left" >
                <TextField 
                id="mobNum"
                name="mobNum"
                label="Phone"
                type="number"
                variant="standard"
                value={userDetails.phone}
                inputProps={
                { readOnly: true }
                }
                />
        </Grid>

        <Grid item xs={6} alignItems="left" >
                <TextField 
                id="streetName"
                name="streetName"
                label="Street Name"
                type="text"
                variant="standard"
                value={userDetails.addressStreet.streetName}
                inputProps={
                { readOnly: true }
                }
                />
        </Grid>

        <Grid item xs={6} alignItems="left" >
                <TextField 
                id="zip"
                name="zip"
                label="Zip Code"
                type="number"
                variant="standard"
                value={userDetails.addressLocation.zipCode}
                inputProps={
                { readOnly: true }
                }
                />
        </Grid>

        <Grid item xs={6} alignItems="left" >
                <TextField 
                id="streetNum"
                name="streetNum"
                label="Street Number"
                type="number"
                variant="standard"
                value={userDetails.addressStreet.streetNumber}
                inputProps={
                { readOnly: true }
                }
                />
        </Grid>

        <Grid item xs={3} alignItems="right" >
                <TextField 
                id="city"
                name="city"
                label="City"
                type="text"
                variant="standard"
                value={userDetails.addressLocation.city}
                inputProps={
                { readOnly: true }
                }
                />
        </Grid>

        <Grid item xs={12} alignItems="center" >
                <TextField
                id="state"
                name="state"
                label="State"
                variant="standard"
                value={userDetails.addressLocation.state}
                inputProps={
                    { readOnly: true }
                    }
                />
        </Grid> 


         <Grid item xs={12} alignItems="left" >
        <FormControl sx={{ m: 1, width: 500 }}>
            <TextField
            id="extras"
            label = "Extras"
            value = {userDetails.extras.map((extra) => (
                extra.replace('extra', 'Extra ')
            ))}
            >
            </TextField>
        </FormControl>
        </Grid> 


        <Grid item xs={12} alignItems="left" >
        <RadioGroup
        row
        name="payMode"
        value={userDetails.payment}
        >
        <FormControlLabel value="creditCard" control={<Radio />} label="Credit Card" />
        <FormControlLabel value="payPal" control={<Radio />} label="PayPal" />
        <FormControlLabel value="cash" control={<Radio />} label="Cash" />
        <FormControlLabel value="bitcoin" control={<Radio />} label="Bitcoin" />
        
        </RadioGroup>
        </Grid>

        <Grid item xs={6} alignItems="left" >
        <TextField 
                id="personalNote"
                name="personalNote"
                type="text"
                variant="standard"
                value={userDetails.note}
                />
        </Grid>

         <Grid item xs={12} alignItems="left" >

        <Stack spacing={3} sx={{ m: 2,width: 300 }}>
                <TextField
                value = {userDetails.tags.map((tag) => (
                    tag.split(',')
                ))}
                variant="standard"
                label="Multiple values"
                inputProps={
                    { readOnly: true }
                    }
                />
        </Stack>
        </Grid> 

        <Grid item xs={12} alignItems="left" >
        <Switch 
            checked={userDetails.reminder}
            inputProps={{ 'aria-label': 'controlled', readOnly: true }}
            color="warning"
        />
        <label>Send me a reminder</label>
        </Grid>

        <Grid item xs={12} alignItems="left" >
        <Switch 
            checked={userDetails.newsletter}
            inputProps={{ 'aria-label': 'controlled', readOnly: true }}
        />
        <label>Subscribe to newsletter</label>
        </Grid>


        <Grid item xs={12} alignItems="left" >
        <Checkbox
        checked={userDetails.confirm}
        inputProps={{ 'aria-label': 'controlled', readOnly: true }}
        />
        <label>Subscribe to newsletter</label>
        </Grid>
        </Grid>
    )
      }

      export default UserInfo;