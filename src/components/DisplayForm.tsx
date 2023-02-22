import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Autocomplete,
  OutlinedInput,
  Radio,
  RadioGroup,
  FormControlLabel,
  Stack,
  Switch,
  Checkbox,
} from "@mui/material";

import { Grid, SelectChangeEvent} from "@mui/material";
import {ICreateBooking} from '../interface/UserRoom';
import Countries from './../data/states';
import extras from './../data/extras';
import hotelTags from './../data/hotelTags';


type TReview = {
   handleSubmit : (formData:any)=> void
   userDetails:ICreateBooking | undefined
  }

  
const DisplayForm:React.FC<TReview> = ({ handleSubmit, userDetails }) => {
  

    const [roomSize,setRoomSize] = React.useState<string>((userDetails && userDetails.room.roomSize) || 'business-suite');
   const [roomQuantity,setRoomQuantity] = React.useState<number>((userDetails && userDetails.room.roomQuantity) || 1);
   const [arrivalDate, setArrivalDate] = React.useState<string>(`${(userDetails && userDetails.stay.arrivalDate) || "2023-02-22T04:00"}`);
   
    const [departureDate, setDepartureDate] = React.useState<string>(`${(userDetails && userDetails.stay.departureDate) || "2021-03-22T04:00"}`);
    const [userFirstName, setUserFirstName] = React.useState<string>((userDetails && userDetails.firstName) || ''); 
    const [userLastName, setUserLastName] = React.useState<string>((userDetails && userDetails.lastName) || '');
    const [userEmail, setUserEmail] = React.useState<string>((userDetails && userDetails.email) || '');
    const [userMobNum, setUserMobNum] = React.useState<string>((userDetails && userDetails.phone) || '');
    const [userStreet, setUserStreet] = React.useState<string>((userDetails && userDetails.addressStreet.streetName) || '');
    const [userStreetNum, setUserStreetNum] = React.useState<number>((userDetails && userDetails.addressStreet.streetNumber) || 1);
  
    const [userZipcode, setUserZipcode] = React.useState<string>((userDetails && userDetails.addressLocation.zipCode) || '');
    const [userCity, setUserCity] = React.useState<string>((userDetails && userDetails.addressLocation.city) || '');
   
    const [extraName, setExtraName] = React.useState<string[]>((userDetails && userDetails.extras) || []);
    const [payMode, setPayMode] = React.useState((userDetails && userDetails.payment) || 'cc');
    const [reminder, setReminder] = React.useState<boolean>(userDetails ? userDetails.reminder : true);
    const [newsletter, setNewsletter] = React.useState<boolean>(userDetails ?  userDetails.newsletter : true);
    const [confirm, setConfirm] = React.useState<boolean>(userDetails ? userDetails.confirm : true);
    const [state, setState] = React.useState<any>((userDetails && userDetails.addressLocation.state) || Countries[0].label);
    const [inputValue, setInputValue] = React.useState('');
    const [note, setNote] = React.useState<string>((userDetails && userDetails.note) || ''); 

    
    const handleChangeExtra = (event: SelectChangeEvent<typeof extraName>) => {
      const {
        target: { value },
      } = event;
      setExtraName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
  
    const handlePayMode = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPayMode((event.target as HTMLInputElement).value);
    };
  
    const handleReminder = (event: React.ChangeEvent<HTMLInputElement>) => {
      setReminder(event.target.checked);
    };
  
    const handleNewsletter = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewsletter(event.target.checked);
    };
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setConfirm(event.target.checked);
    };

    const handleChangeRoom = (event: SelectChangeEvent<string>) => {
      setRoomSize(event.target.value);
    };

    const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserCity(event.target.value)
    }

    const handleStreetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserStreet(event.target.value)
     }

     const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserZipcode(event.target.value)
     }

     const handleSetNote = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNote(event.target.value)
     }

 
    const handleFormSubmit = (event:React.FormEvent) => {
      event.preventDefault();
      
      const formData = {
               "stay": {
                 "arrivalDate": arrivalDate,
                 "departureDate": departureDate,
               },
               "room": {
                 "roomSize": roomSize,
                 "roomQuantity": roomQuantity
               },
               "firstName": userFirstName,
               "lastName": userLastName,
               "email": userEmail,
               "phone": userMobNum,
               "addressStreet": {
                 "streetName": userStreet,
                 "streetNumber": userStreetNum
               },
               "addressLocation": {
                 "zipCode": userZipcode,
                 "state": state,
                 "city": userCity
               },
               "extras": extraName,
               "payment": payMode,
               "note": note,
               "tags":hotelTags ,
               "reminder": reminder,
               "newsletter": newsletter,
               "confirm": confirm
              }

    handleSubmit(formData);
              
    };

  

    return(
      <form data-testid="login-form" onSubmit={handleFormSubmit}>
        <Grid container display="row">
        <Grid item xs={6} alignItems="left" >
        <TextField
          id="arrival-datetime-local"
          inputProps={{ 'aria-label': 'arrivalDate', "data-testid": "arrivalDate",  "name":"arrivalDate" }}
          label="Arrival Date"
          type="datetime-local"
          name="arrivalDate"
          aria-hidden = {false}
          onChange={(e)=>setArrivalDate(e.target.value)}
          defaultValue={arrivalDate}
          InputLabelProps={{
            shrink: true
          }}
    /> 
    </Grid>
    <Grid item xs={6} alignItems="left" >
       <TextField
      id="departure-datetime-local"
      inputProps={{ 'aria-label': 'departureDate', "data-testid": "departureDate",  "name":"departureDate" }}
      label="Deparure Date"
      type="datetime-local"
      name="departureDate"
      aria-hidden = {false}
      onChange={(e)=>setDepartureDate(e.target.value)}
      defaultValue={departureDate}
      InputLabelProps={{
        shrink: true,
      }}
    />
    </Grid>
          <Grid item xs={6} alignItems="left" >
            <FormControl>
              <Select
                id="roomSize"
                inputProps={{ 'aria-label': 'roomSize', "data-testid": "roomSize",  "name":"roomSize" }}
                label="Select"
                name="roomSize"
                aria-hidden="false"
                value={roomSize}
               onChange={handleChangeRoom}
               style={{width:'240px'}}
             >
               <MenuItem value='business-suite'>Business Suite</MenuItem>
               <MenuItem value='presidential-suite'>Presidential Suite</MenuItem>
               <MenuItem value='family-suite'>Family Suite</MenuItem>
             </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} alignItems="left" >
          <TextField 
                  id="roomQuantity"
                  inputProps={ { min: 1} }
                  name="roomQuantity"
                  label="Room Quantity"
                  type="number"
                  variant="standard"
                  value={roomQuantity}
                  onChange={(e) => {setRoomQuantity(parseInt(e.target.value))}}
                  />
          </Grid>
          <Grid item xs={12} alignItems="left" >
                  <TextField 
                    id="firstName"
                    inputProps={{ 'aria-label': 'firstName', "data-testid": "firstName",  "name":"firstName" }}
                    label="First Name"
                    type="text"
                    variant="standard"
                    value={userFirstName}
                    onChange={(e) => setUserFirstName(e.target.value)}
                  />
          </Grid>

          <Grid item xs={12} alignItems="left" >
                  <TextField 
                  id="lastName"
                  inputProps={{ 'aria-label': 'lastName', "data-testid": "lastName",  "name":"lastName"  }}
                  label="Last Name"
                  type="text"
                  variant="standard"
                  value={userLastName}
                  onChange={(e) => setUserLastName(e.target.value)}
                  
                  />
          </Grid>

          <Grid item xs={12} alignItems="left" >
                  <TextField 
                    id="email"
                    name="email"
                    inputProps={{ 'aria-label': 'email', "data-testid": "email",  "name":"email"  }}
                    label="Email"
                    type="email"
                    variant="standard"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                   
                  />
          </Grid>

          <Grid item xs={12} alignItems="left" >
                  <TextField 
                  id="mobNum"
                  name="mobNum"
                  inputProps={{ 'aria-label': 'mobNum', "data-testid": "mobNum",  "name":"mobNum"  }}
                  label="Mobile Number"
                  type="number"
                  variant="standard"
                  value={userMobNum}
                  onChange={(e) => setUserMobNum(e.target.value)}
                  
                  />
          </Grid>

          <Grid item xs={6} alignItems="left" >
                  <TextField 
                  id="streetName"
                  name="streetName"
                  inputProps={{ 'aria-label': 'streetName', "data-testid": "streetName",  "name":"streetName"  }}
                  label="Street Name"
                  type="text"
                  variant="standard"
                  value={userStreet}
                  onChange={handleStreetChange}
                  />
          </Grid>
         
          <Grid item xs={6} alignItems="left" >
                  <TextField 
                  id="zip"
                  inputProps={{ 'aria-label': 'zip', "data-testid": "zip",  "name":"zip"  }}
                  name="zip"
                  label="Zip Code"
                  type="text"
                  variant="standard"
                  value={userZipcode}
                  onChange = {handleZipCodeChange}
                  
                  />
          </Grid>

          <Grid item xs={6} alignItems="left" >
                  <TextField 
                  id="streetNum"
                  name="streetNum"
                  label="Street Number"
                  type="number"
                  variant="standard"
                  value={userStreetNum}
                  onChange={(e) => setUserStreetNum(parseInt(e.target.value))}
                  
                  />
          </Grid>
          <Grid item xs={3} alignItems="right" >
                  <TextField 
                  id="city"
                  name="city"
                  inputProps={{ 'aria-label': 'city', "data-testid": "city",  "name":"city"  }}
                  label="City"
                  type="text"
                  variant="standard"
                  value={userCity}
                  onChange={handleCityChange}
                  
                  />
          </Grid>

           <Grid item xs={12} alignItems="center" >
          <FormControl sx={{ m: 2, width: 300 }}>
          <Autocomplete
              id="country-select"
              sx={{ width: 300 }}
              value={state}
                onChange={(event, newValue) => {
                  setState(newValue) }}
                 inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
              options={Countries.map((option) => option.label )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                )}
            />
            </FormControl>
          </Grid> 
          
         
          <Grid item xs={12} alignItems="left" >
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="extras-label">Extras</InputLabel>
              <Select
                labelId="extras"
                id="extras"
                inputProps={{ 'aria-label': 'extras', "data-testid": "extras",  "name":"extras" }}
                multiple
                value={extraName}
                onChange={handleChangeExtra}
                input={<OutlinedInput label="Extras" />}
              >
                {extras.map((extra) => (
                  <MenuItem
                    key={extra.value}
                    value={extra.value}
                  >
                    {extra.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>


        <Grid item xs={12} alignItems="left" >
          <FormControl>
         
          <RadioGroup
            row
            name="payMode"
            value={payMode}
            onChange={handlePayMode}
          >
            <FormControlLabel value="creditCard" control={<Radio />} label="Credit Card" />
            <FormControlLabel value="payPal" control={<Radio />} label="PayPal" />
            <FormControlLabel value="cash" control={<Radio />} label="Cash" />
            <FormControlLabel value="bitcoin" control={<Radio />} label="Bitcoin" />
           
          </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={6} alignItems="left" >
        <TextField 
                  id="personalNote"
                  inputProps={{ 'aria-label': 'personalNote', "data-testid": "personalNote",  "name":"personalNote"  }}
                  name="personalNote"
                  type="text"
                  variant="standard"
                  value={note}
                 
                  onChange={handleSetNote}
                  />
        </Grid>

        <Grid item xs={12} alignItems="left" >
        
            <Stack spacing={3} sx={{ m: 2,width: 300 }}>
              <Autocomplete
                multiple
                id="hotelTags"
                options={hotelTags}
                defaultValue={[hotelTags[1]]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Multiple values"
                    placeholder="Favorites"
                  />
                )}
              />
          </Stack>
        </Grid>

        <Grid item xs={12} alignItems="left" >
            <Switch 
            name="reminder"
              checked={reminder}
              onChange={handleReminder}
              inputProps={{ 'aria-label': 'reminder' }}
              color="warning"
            />
            <label>Send me a reminder</label>
        </Grid>
     
        <Grid item xs={12} alignItems="left" >
            <Switch 
            name = "newsletter"
              checked={newsletter}
              onChange={handleNewsletter}
              inputProps={{ 'aria-label': 'newsletter', 'name':'newsletter' }}
            />
            <label>Subscribe to newsletter</label>
        </Grid>


        <Grid item xs={12} alignItems="left" >
        <Checkbox
          data-testid = "confirm"
          name = "confirm"
            checked={confirm}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'confirm' }}
          />
            <label>I accept</label>
        </Grid>

        <Grid item xs={12} alignItems="left" >
        <Button type="submit" variant="contained" data-testid="submitForm" name = "submitForm">Save</Button>
        </Grid>
        </Grid> 
      </form>
    )
  };

  export default DisplayForm;