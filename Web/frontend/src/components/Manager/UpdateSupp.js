import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
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

const UpdateSupplier = () => {
  const Suppliers = [
    { label: 'dummy Name', id: 2, phone: '+201092031781', address: '123 station street' },
    { label: 'dummy Name', id: 3, phone: '+201092031781', address: '123 station street' },
    { label: 'dummy Name', id: 4, phone: '+201092031781', address: '123 station street' },
    { label: 'dummy Name', id: 5, phone: '+201092031781', address: '123 station street' },
    { label: 'dummy Name', id: 6, phone: '+201092031781', address: '123 station street' },
    { label: 'dummy Name', id: 7, phone: '+201092031781', address: '123 station street' },
    { label: 'dummy Name', id: 8, phone: '+201092031781', address: '123 station street' }];

  const [anyChange, setAnyChange] = React.useState(0);
  
  const [selcted, setSelected] = React.useState(null);
  const [Address, setAddress] = React.useState('');
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setAnyChange(1);
  }
  const [phone, setphone] = React.useState('');
  const [err, seterr] = React.useState(true);
  const handlePhoneChange = function (value) {

    setphone(value);
    if (!validator.isMobilePhone(value)) 
      {
        seterr(true);
        setAnyChange(0);
      }
    
    else {
      seterr(false);
      setAnyChange(1);

    }
  }
  const handleSupplierChange = (e, val) => {
    setSelected(val);
    setphone(val.phone);
    setAddress(val.address)
  };
  const handleSubmit = (e) => {

  }


  return (
    <div className='addA'>
      <h3><span>Update Supplier</span></h3>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        value={selcted}
        onChange={handleSupplierChange}
        options={Suppliers}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Supplier" />}
      />
      {selcted && <form action="" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', gap: '15px' }} className='AddSupp'>
        <TextField id="outlined-basic" defaultValue={Address} onChange={handleAddressChange} sx={{ width: '300px' }} required label="Address" variant="outlined" />
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
        <button className='addP' disabled={anyChange == 0 ||err} type='submit' onClick={handleSubmit}> Update Supplier</button>

      </form>}
    </div>
  );
}

export default UpdateSupplier;