import Autocomplete from '@mui/material/Autocomplete';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import './AddProduct.css'

const DeleteEmployee = () => {
  const employees = [
    {label: 'dummy Name'},
    {label: 'dummy Name'},
    {label: 'dummy Name'},
    {label: 'dummy Name'}
  ];
  const [selcted, setSelected] = React.useState(null);
  const handleEmployeeChange = (e, v) => {
    setSelected(v);
  }
  return (<div className="DeleteP">
    <h3><span>Delete Employee</span></h3>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      value={selcted}
      onChange={handleEmployeeChange}
      options={employees}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Employee" />}
    />
    <button disabled={!selcted} className='addP' type='submit'> Delete Employee</button>

  </div>);
}

export default DeleteEmployee;