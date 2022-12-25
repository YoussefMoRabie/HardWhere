import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './AddProduct.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import validator from 'validator'
import Autocomplete from '@mui/material/Autocomplete';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputColor from 'react-input-color';
import { flexbox } from '@mui/system';



const AddProduct = () => {
  
  const Suppliers=["one","two","three","four","five","six","seven","eight","eight"];
  const Storages=["one","two","three","four","five","six","seven","eight","eight"];
  const [URLcolor, setURLcolor] = React.useState('primary'); ;
  const [Idcolor, setIdcolor] = React.useState('primary'); ;
  const [color, setColor] = React.useState({});
  const [Supplier, setSupplier] = React.useState('');
  const [Img, setImg] = React.useState('');
  const [Id, setId] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [count, setCount] = React.useState('');
  const [name, setName] = React.useState('');

  const handleImgChange = (event) => {
    if (validator.isURL(event.target.value)) {
      setURLcolor("primary")
    } else {
      setURLcolor("error")
    }
    setImg(event.target.value);
  };
  const handleNameChange = (event) => {

    setName(event.target.value);
  };
  const handleIdChange = (event) => {
    if (validator.isNumeric(event.target.value)) {
      setIdcolor("primary");
    }
    else {
      setIdcolor("error");
    }
    setId(event.target.value);
  };
  const handleCountChange = (event) =>
    event.target.value < 1
      ? (event.target.value = 1)
      : setCount(event.target.value)

  const handleSupplierChange = (event) => {
    setSupplier(event.target.value);
  };
  const handlePriceChange = (event) =>
    event.target.value < 1
      ? (event.target.value = 1)
      : setPrice(event.target.value);
  const handleSubmit = () => {

  };




  return (
    <div className="New">
      <h3><span>Add New Product</span></h3>
      <form className='formAdd' onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth={false}
          id="outlined-required"
          value={name}
          onChange={handleNameChange}
          label="Product Name"

        />
        <FormControl>
        <TextField
          required
          fullWidth={false}
          id="outlined-required"
          value={Id}
          error={Idcolor=="error"}
          onChange={handleIdChange}
          label="Product ID"

        />
          {Idcolor == "error" && <span style={{ color: 'red', fontSize: 12, padding: 5 }}>*Invalid ID</span>}

        </FormControl>
        <Autocomplete
          disablePortal
          required
          onChange={handleSupplierChange}
          id="combo-box-demo"
          options={Suppliers}
          fullWidth
          renderInput={(params) => <TextField {...params} label="Supplier" />}
        />
        <Autocomplete
          disablePortal
          required
          id="combo-box-demo"
          options={Storages}
          fullWidth
          renderInput={(params) => <TextField {...params} label="Storage" />}
        />
        <TextField
          required={true}
          id="outlined-number"
          label="Count"
          type="number"
          onChange={handleCountChange}
          InputLabelProps={{
            shrink: true,
            min: 0,
          }}
        />
        <FormControl>
        <TextField
          id="outlined-multiline-static"
          label="Image Link"
          multiline
          required={true}
          error={URLcolor=='error'}
          rows={4}
          value={Img}
          onChange={handleImgChange}
        />
         {URLcolor=="error" && <span style={{color:'red', fontSize:12,padding:5}}>*Invalid URL</span>}
        </FormControl>
        <FormControl>
          <InputLabel required={true} htmlFor="outlined-adornment-amount">Price</InputLabel>
          <OutlinedInput
            required={true}
            type="number"
            id="outlined-adornment-amount"
            value={price}
            onChange={handlePriceChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />

        </FormControl>
        <div className='colorpicker'>
          <label htmlFor="">Choose Color </label>
          <input className='colorp' type="color" value={color}
            onChange={(e) => { setColor(e.target.value) }}></input>
        </div>



        <button className='addP' type='submit' onSubmit={handleSubmit}> Add Product</button>
      </form>

    </div>


  );
}

export default AddProduct;