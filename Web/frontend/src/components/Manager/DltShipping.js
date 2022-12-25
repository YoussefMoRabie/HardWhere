import Autocomplete from '@mui/material/Autocomplete';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import './AddProduct.css'

const DeleteCompany = () => {
  const companies = [
    { label: 'dummy Name' },
    { label: 'dummy Name' },
    { label: 'dummy Name' },
    { label: 'dummy Name' }
  ];
  const [selcted, setSelected] = React.useState(null);
  const handleCompanyChange = (e, v) => {
    setSelected(v);
  }
  return (<div className="DeleteP">
    <h3><span>Delete Company</span></h3>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      value={selcted}
      onChange={handleCompanyChange}
      options={companies}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Company" />}
    />
    <button disabled={!selcted} className='addP' type='submit'> Delete Company</button>

  </div>);
}

export default DeleteCompany;