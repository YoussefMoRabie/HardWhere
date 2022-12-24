import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ReactPhoneInput from 'react-phone-input-mui';
import validator from 'validator'
import { withStyles } from '@material-ui/core';
const styles = theme => ({
  field: {
    margin: '10px 0',
  },
  countryList: {
    ...theme.typography.body1,
  },
});

const AddSupplier = () => {
  const [suppName, setSuppName] = React.useState('');
  const handleNameChange = (e) => {
    if (!validator.isAlpha(e.target.value)) {
      seterr(true);
    }
    else {
      setSuppName(e.target.value);
      seterr(false);
    }
  }
  const [Address, setAddress] = React.useState('');
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  }
  const [phone, setphone] = React.useState('');
  const [err, seterr] = React.useState(true);
  const handlePhoneChange = function (value) {

    setphone(value);
    if (!validator.isMobilePhone(value)) {
      seterr(true);
    }
    else
      seterr(false);
  }
  const handleSubmit = (e) => {

  }

  
  return (
    <div className='addA'>
      <h3><span>Add Supplier</span></h3>
      <form action="" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', gap: '15px' }} className='AddSupp'>
        <TextField id="outlined-basic" onChange={handleNameChange} sx={{ width: '300px' }} required label="Supplier Name" variant="outlined" />
        <TextField id="outlined-basic" onChange={handleAddressChange} sx={{ width: '300px' }} required label="Address" variant="outlined" />
        <ReactPhoneInput
          value={phone}
          defaultCountry={'eg'}
          onChange={handlePhoneChange}
          countryCodeEditable={false}
          component={TextField}
        // inputExtraProps={{
        //   margin: 'normal',
        //   autoComplete: 'phone',
        //   name: 'phone'
        // }}
        />
        <button className='addP' disabled={err} type='submit' onClick={handleSubmit}> Add Supplier</button>

      </form>
    </div>
  );
}

export default AddSupplier;