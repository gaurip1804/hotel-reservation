 import React, { useContext, useEffect, useState } from "react";
 import UserReservationContext from '../context/reservations';
 import "react-date-range/dist/styles.css"; //
 import "react-date-range/dist/theme/default.css";
 import {
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   Button,
   TextField,
   NativeSelect,
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
 

 type editInterface = {
    handleSubmitEdit(): void
    userDetails : ICreateBooking
 }
 const EditUser:React.FC<editInterface> = ({handleSubmitEdit, userDetails }) => {

    const { editUserReservationById } =  useContext(UserReservationContext);

    const [dates, setDates] = useState([
      {
        startDate: new Date(),
        endDate: null, 
        key: "selection",
      },
    ]);
  
   
  
    const [userFirstName, setUserFirstName] = React.useState<string>(userDetails.firstName || ''); 
    const [userLastName, setUserLastName] = React.useState<string>(userDetails.lastName || '');
    const [userEmail, setUserEmail] = React.useState<string>(userDetails.email || '');
    const [userMobNum, setUserMobNum] = React.useState<string>(userDetails.phone || '');
    const [userStreet, setUserStreet] = React.useState<string>(userDetails.addressStreet.streetName || '');
    const [userStreetNum, setUserStreetNum] = React.useState<number>(userDetails.addressStreet.streetNumber || 0);
  
    const [userZipcode, setUserZipcode] = React.useState<string>(userDetails.addressLocation.zipCode || '');
    const [userCity, setUserCity] = React.useState<string>(userDetails.addressLocation.city || '');
   
    const [extraName, setExtraName] = React.useState<string[]>(userDetails.extras || '');
    const [payMode, setPayMode] = React.useState(userDetails.payment || 'cc');
    const [reminder, setReminder] = React.useState(userDetails.reminder);
    const [newsletter, setNewsletter] = React.useState(userDetails.newsletter);
    const [confirm, setConfirm] = React.useState(userDetails.confirm );
    const [state, setState] = React.useState(userDetails.addressLocation.state);
    const [inputValue, setInputValue] = React.useState('');
    const [note, setNote] = React.useState<string>(userDetails.note || ''); 

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

      const handleSubmit = (event:React.FormEvent) => {
        let formData={};
        event.preventDefault();
    
        handleSubmitEdit();
console.log("userFirstName..",userFirstName)
        formData={
                 "stay": {
                   "arrivalDate": "2021-11-01T04:00:00.000Z",
                   "departureDate": "2021-11-04T04:00:00.000Z"
                 },
                 "room": {
                   "roomSize": "presidential-suite",
                   "roomQuantity": 2
                 },
                 "firstName": userFirstName,
                 "lastName": userLastName,
                 "email": "idm.op@idm.com",
                 "phone": userMobNum,
                 "addressStreet": {
                   "streetName": userStreet,
                   "streetNumber": userStreetNum
                 },
                 "addressLocation": {
                   "zipCode": userZipcode,
                   "state": "Arkansas",
                   "city": userCity
                 },
                 "extras": extras.map(extra=> extra.value),
                 "payment": payMode,
                 "note": note,
                 "tags":hotelTags ,
                 "reminder": reminder,
                 "newsletter": newsletter,
                 "confirm": confirm
                }
        
        editUserReservationById(userDetails.id, formData);
      };

      return(
        <form onSubmit={handleSubmit}>
          <Grid container display="row">
            <Grid item xs={6} alignItems="left" >
              <FormControl>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Room Size
                </InputLabel>
                <NativeSelect
                  defaultValue={10}
                  inputProps={{
                    name: 'roomSize',
                    id: 'uncontrolled-native',
                  }}
                >
                  <option value={10}>Business Suite</option>
                  <option value={20}>Presidential Suite</option>
                  <option value={30}>Family Suite</option>
                </NativeSelect>
              </FormControl>
            </Grid>

            <Grid item xs={6} alignItems="left" >
            <TextField 
                    id="roomQuantity"
                    name="roomQuantity"
                    label="Room Quantity"
                    type="number"
                    variant="standard"
                    />
            </Grid>
            <Grid item xs={12} alignItems="left" >
                    <TextField 
                      id="firstName"
                      name="firstName"
                      type="text"
                      variant="standard"
                      value={userFirstName}
                      onChange={(e) => setUserFirstName(e.target.value)}
                    />
            </Grid>

            <Grid item xs={12} alignItems="left" >
                    <TextField 
                    id="lastName"
                    name="lastName"
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
                    type="text"
                    variant="standard"
                    value={userStreet}
                    onChange={(e) => setUserStreet(e.target.value)}
                    
                    />
            </Grid>
           
            <Grid item xs={6} alignItems="left" >
                    <TextField 
                    id="zip"
                    name="zip"
                    type="number"
                    variant="standard"
                    value={userZipcode}
                    onChange={(e) => setUserZipcode(e.target.value)}
                    
                    />
            </Grid>

            <Grid item xs={6} alignItems="left" >
                    <TextField 
                    id="streetNum"
                    name="streetNum"
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
                    type="text"
                    variant="standard"
                    value={userCity}
                    onChange={(e) => setUserCity(e.target.value)}
                    
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
                    name="personalNote"
                    type="text"
                    variant="standard"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
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
                checked={reminder}
                onChange={handleReminder}
                inputProps={{ 'aria-label': 'controlled' }}
                color="warning"
              />
              <label>Send me a reminder</label>
          </Grid>

          <Grid item xs={12} alignItems="left" >
              <Switch 
                checked={newsletter}
                onChange={handleNewsletter}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <label>Subscribe to newsletter</label>
          </Grid>


          <Grid item xs={12} alignItems="left" >
          <Checkbox
              checked={confirm}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
              <label>Subscribe to newsletter</label>
          </Grid>

          <Grid item xs={12} alignItems="left" >
          <Button type="submit" variant="contained">Save</Button>
          </Grid>
          </Grid> 
        </form>
      )

};

export default EditUser;