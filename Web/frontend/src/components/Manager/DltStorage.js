import Autocomplete from '@mui/material/Autocomplete';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import './AddProduct.css'

const DeleteStorage = () => {
  const storages = [
    { label: 'dummy Name' },
    { label: 'dummy Name' },
    { label: 'dummy Name' },
    { label: 'dummy Name' }
  ];
  const [selcted, setSelected] = React.useState(null);
  const handleStorageChange = (e, v) => {
    setSelected(v);
  }
  return (<div className="DeleteP">
    <h3><span>Delete Storage</span></h3>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      value={selcted}
      onChange={handleStorageChange}
      options={storages}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Storage" />}
    />
    <button disabled={!selcted} className='addP' type='submit'> Delete Storage</button>

  </div>);
}

export default DeleteStorage;