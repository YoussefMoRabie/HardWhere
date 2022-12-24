import Autocomplete from '@mui/material/Autocomplete';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import './AddProduct.css'

const DeleteSupplier = () => {
  const suppliers = [
    { label: 'dummy Name' },
    { label: 'dummy Name' },
    { label: 'dummy Name' },
    { label: 'dummy Name' }
  ];
  const [selcted, setSelected] = React.useState(null);
  const handleSupplierChange = (e, v) => {
    setSelected(v);
  }
  return (<div className="DeleteP">
    <h3><span>Delete Suppplier</span></h3>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      value={selcted}
      onChange={handleSupplierChange}
      options={suppliers}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Supplier" />}
    />
    <button disabled={!selcted} className='addP' type='submit'> Delete Supplier</button>

  </div>);
}

export default DeleteSupplier;