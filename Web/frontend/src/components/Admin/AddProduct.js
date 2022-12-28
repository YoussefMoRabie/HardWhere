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
import useFetch from "../useFetch";


const AddProduct = () => {
  const [URLcolor, setURLcolor] = React.useState('primary'); ;
  const [Idcolor, setIdcolor] = React.useState('primary'); ;
  const [color, setColor] = React.useState({});
  const [Suid, setSupplierId] = React.useState('');
  const [Stid, setStorageId] = React.useState('');
  const [Img, setImg] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [count, setCount] = React.useState('');
  const [name, setName] = React.useState('');
  const [selected_storage, set_selected_storage] = React.useState(null);
  const [selected_supplier, set_selected_supplier] = React.useState(null);

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
  const handleCountChange = (event) =>
    event.target.value < 1
      ? (event.target.value = 1)
      : setCount(event.target.value)

  const handleSupplierChange = (event,val) => {
    set_selected_supplier(val);
    setSupplierId(val.suid);
  };
  const handleStorageChange = (event,val) => {
    set_selected_storage(val);
    setStorageId(val.stid);
  };

  const handlePriceChange = (event) =>
    event.target.value < 1
      ? (event.target.value = 1)
      : setPrice(event.target.value);


    const Storages = [];
    const { data: stoData } = useFetch(
      "http://localhost:1444/api/v1/getStorages"
    );
    for (const sto of stoData) {
      Storages.push({
        label: sto.st_address,
        stid: sto.stid,
      });
    };

    const Suppliers = [];
    const { data: supData } = useFetch(
      "http://localhost:1444/api/v1/getAllSuppliers"
    );
    for (const sup of supData) {
      Suppliers.push({
        label: sup.su_name,
        suid: sup.suid,
      });
    };


  const handleSubmit = async () => {
    const res = await fetch(`http://localhost:1444/api/v1/addproduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_name:name,
        price:price,
        color:color,
        count:count,
        st_id:Stid,
        su_id:Suid,
        img_link:Img
      }),
    });
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
  
        <Autocomplete
          disablePortal
          required
          value={selected_supplier}
          onChange={handleSupplierChange}
          id="combo-box-demo"
          options={Suppliers}
          fullWidth
          renderInput={(params) => <TextField {...params} label="Supplier" />}
        />
        <Autocomplete
          disablePortal
          required
          value={selected_storage}
          onChange={handleStorageChange}
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