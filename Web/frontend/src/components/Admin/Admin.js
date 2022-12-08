import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Admin.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputColor from 'react-input-color';
import { flexbox } from '@mui/system';



const Admin = () => {
  const [color, setColor] = React.useState({});
  const [Supplier, setSupplier] = React.useState('');
  const [Img, setImg] = React.useState('');
  const [Id, setId] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [count, setCount] = React.useState('');
  const [name, setName] = React.useState('');

  const handleSubmit = () => {

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: Img,
      // 👇 Set headers manually for single file upload
      headers: {
        'content-type': Img.type,
        'content-length': `${Img.size}`, // 👈 Headers need to be a string
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };
  
  

  const handleSupplierChange = (event) => {
    setSupplier(event.target.value);
  };
  return (
    <div className="New">
      <form className='formAdd' onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth={false}
          id="outlined-required"
          value={name}
          onChange={(event) => setName(event.target.value)}
          label="Product Name"
          
        />
        <TextField
          required
          fullWidth={false}
          id="outlined-required"
          value={Id}
          onChange={(event) => setId(event.target.value)}
          label="Product ID"
          
        />
        <FormControl>
          <InputLabel required={true} id="demo-simple-select-helper-label">Supplier</InputLabel>
          <Select required={true}
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={Supplier}
            label="Supplier"
            onChange={handleSupplierChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <TextField
          required={true}
          id="outlined-number"
          label="Count"
          type="number"
          onChange={(event) =>
            event.target.value < 1
              ? (event.target.value = 1)
              : setCount(event.target.value)
          }
          InputLabelProps={{
            shrink: true,
            min: 0,
          }}
        />
        <FormControl>
          <InputLabel required={true} htmlFor="outlined-adornment-amount">Price</InputLabel>
          <OutlinedInput
            required={true}
            type="number"
            id="outlined-adornment-amount"
            value={price}
            onChange={(event) =>
              event.target.value < 1
                ? (event.target.value = 1)
                : setPrice(event.target.value)
            }
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
        <div className='colorpicker'> 
        <label htmlFor="">Choose Color </label>
          <input className='colorp' type="color" value={color}
            onChange={(e) => { setColor(e.target.value) }}></input>
        </div>

        <FormControl sx={{display:'flex',gap:"10px",}}>
          <label>Upload Image </label>
          <input
          onChange={(e)=>{
            setImg(e.target.files[0])
          }}
            required={true}
            type="file"
            
          />
        </FormControl>
        <button className='addP' type='submit' onSubmit={handleSubmit}> Add Product</button>
      </form>

    </div>


  );
}

export default Admin;