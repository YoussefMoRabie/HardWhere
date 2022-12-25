import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ReactPhoneInput from 'react-phone-input-mui';
import validator from 'validator'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { withStyles } from '@material-ui/core';


const UpdateStorage = () => {
  const storages = [
    { label: 'dummy Name', id: 2, phone: '+201092031781', address: '123 station street',MaxCapacity:200 },
    { label: 'dummy Name', id: 3, phone: '+201092031781', address: '123 station street',MaxCapacity:200 },
    { label: 'dummy Name', id: 4, phone: '+201092031781', address: '123 station street',MaxCapacity:200 },
    { label: 'dummy Name', id: 5, phone: '+201092031781', address: '123 station street',MaxCapacity:200 },
    { label: 'dummy Name', id: 6, phone: '+201092031781', address: '123 station street',MaxCapacity:200 },
    { label: 'dummy Name', id: 7, phone: '+201092031781', address: '123 station street',MaxCapacity:200 },
    { label: 'dummy Name', id: 8, phone: '+201092031781', address: '123 station street',MaxCapacity:200 }];

  const [anyChange, setAnyChange] = React.useState(0);
  const [MaxCapacity, setCapacity] = React.useState(1);
  const [selcted, setSelected] = React.useState(null);


  const handleStorageChange = (e, val) => {
    setSelected(val);
    setCapacity(val.MaxCapacity);
  };
  const handleCapacityChange=(event)=>{
    setAnyChange(1);
    event.target.value < 1
      ? (event.target.value = 1)
      : setCapacity(event.target.value); 
  }
  const handleSubmit = (e) => {

  }


  return (
    <div className='addA'>
      <h3><span>Update Storage</span></h3>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        value={selcted}
        onChange={handleStorageChange}
        options={storages}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Stroage" />}
      />
      {selcted && <form action="" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', gap: '2px' }} className='AddSupp'>
        <FormControl sx={{ margin: '10px' }}>
          <InputLabel required={true} htmlFor="outlined-adornment-amount">Maximum Capacity</InputLabel>
          <OutlinedInput
            required={true}
            type="number"
            id="outlined-adornment-amount"
            value={MaxCapacity}
            onChange={handleCapacityChange}
            label="Maximum Capacity"
          />

        </FormControl>
        <button className='addP' disabled={anyChange == 0 } type='submit' onClick={handleSubmit}> Update Storage</button>

      </form>}
    </div>
  );
}

export default UpdateStorage;