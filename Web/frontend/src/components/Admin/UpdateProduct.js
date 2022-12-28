import Autocomplete from '@mui/material/Autocomplete';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import './AddProduct.css'
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import validator from 'validator'
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputColor from 'react-input-color';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { lime } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import useFetch from "../useFetch";


const UpdateProduct = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [selected, setSelected] = React.useState(null);
  const [URLcolor, setURLcolor] = React.useState('primary');;
  const [Img, setImg] = React.useState('');
  const [price, setPrice] = React.useState();
  const [newprice, setnewPrice] = React.useState();
  const [count, setCount] = React.useState();
  const [addOffer, setaddOffer] = React.useState(false);
  const [anyChange, setAnyChange] = React.useState(0);
  const [StartDate, setStartDate] = React.useState(new Date());
  const [EndDate, setEndDate] = React.useState(new Date());  
  const [products,setPro] =React.useState([]);

  const getallPro = async () => {
    try {
      const Res = await fetch(
        `http://localhost:1444/api/v1/getAllProducts`
      );
      const { data } = await Res.json();
      setPro(data);
    } catch (error) {
      console.log(error);
    }
  };
  getallPro();

  const handleImgChange = (event) => {
    setAnyChange(1);
    if (validator.isURL(event.target.value)) {
      setURLcolor("primary")
    } else {
      setURLcolor("error")
    }
    setImg(event.target.value);
  };

  const handlePriceChange = (event) => {
    setAnyChange(1);
    event.target.value < 1
      ? (event.target.value = 1)
      : setPrice(event.target.value);

  }
  const handleNewPriceChange = (event) => {
    setAnyChange(1);
    event.target.value < 1
      ? (event.target.value = 1)
      : setnewPrice(event.target.value);

  }
  const handleStartDateChange = (date) => {
    setAnyChange(1);
    setStartDate(date)
    console.log(date);
  }
  const handleEndDateChange = (date) => {
    setAnyChange(1);
    setEndDate(date);
    console.log(date);
  }
  const handleSubmit = async (e) => {
    const res = await fetch(
      `http://localhost:1444/api/v1/updateproduct`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pid: selected.pid,
          price:price,
          count:count,
          img_link:Img,
          has_offer:addOffer,
          new_price:newprice,
          start_date:StartDate.toISOString().slice(0, 19).replace("T", " "),
          end_date:EndDate.toISOString().slice(0, 19).replace("T", " ")
        }),
      }
    );
    const { status } = await res.json();

    if (status === true) {
      setAnyChange(0);
      document.querySelector(".successD").classList.add("active");
      setTimeout(() => {
        document.querySelector(".successD").classList.remove("active");
      }, 3000);
    } else {
      document.querySelector(".FailD").classList.add("active");
      setTimeout(() => {
        document.querySelector(".FailD").classList.remove("active");
      }, 3000);
    }
  };

  const handleCountChange = (event) => {
    setAnyChange(1);
    event.target.value < 1
      ? (event.target.value = 1)
      : setCount(event.target.value)
  }

  const handleProductChange = (e, v) => {
    setSelected(v);
    console.log(v);
    setPrice(v.price);
    setCount(v.count);
    setImg(v.img_link);
    setnewPrice(v.price);
  }

  return (
  <div className='UpdateP' >
      <h3><span>Update Product</span></h3>

    <Autocomplete
      disablePortal
      id="combo-box-demo"
        value={selected}
      onChange={handleProductChange}
        getOptionLabel={(option) => option.product_name ? option.product_name : ""}
      options={products}
      sx={{ width: 300 }}
        renderOption={(props, option) => {
          return (
            <li {...props} data-sid={option.pid} key={option.pid}>
              {option.product_name}
            </li>
          );
        }}
      renderInput={(params) => <TextField {...params} label="Product" />}
    />
    {selected && <form className='formAdd' onSubmit={(e)=>{
        handleSubmit(e)
    e.preventDefault();
     }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          sx={{ flex: 1 }}
          required={true}
          id="outlined-number"
          label="Count"
          value={count}
          type="number"
          onChange={handleCountChange}
          InputLabelProps={{
            shrink: true,
            min: 0,
          }}
        />
      </div>


      <FormControl sx={{ flex: 1 }}>
        <TextField
          sx={{ flex: 1 }}
          id="outlined-multiline-static"
          label="Image Link"
          multiline
          required={true}
          error={URLcolor == 'error'}
          rows={4}
          defaultValue={Img}
          value={Img}
          onChange={handleImgChange}
        />
        {URLcolor == "error" && <span style={{ color: 'red', fontSize: 12, padding: 5 }}>*Invalid URL</span>}
      </FormControl>

      <FormControl sx={{ flex: 1 }}>
        <InputLabel required={true} htmlFor="outlined-adornment-amount">Price</InputLabel>
        <OutlinedInput
          required={true}
          type="number"
          id="outlined-adornment-amount"
          defaultValue={price}
          value={price}
          onChange={handlePriceChange}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Amount"
        />
      </FormControl>
      <FormControlLabel control={<Checkbox onChange={(e) => { setaddOffer(e.target.checked) }}
        {...label} />} label="Add Offer" />
      {addOffer && <div className='offerMenu'> <FormControl sx={{ flex: 1 }}>
        <InputLabel required={true} htmlFor="outlined-adornment-amount">New Price</InputLabel>
        <OutlinedInput
          required={true}
          type="number"
          id="outlined-adornment-amount"
          defaultValue={newprice}
          value={newprice}
          onChange={handleNewPriceChange}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Amount"
        />
      </FormControl>
        <div >
          <label htmlFor="datepickerstart">Start Date</label>
          <DatePicker id='datepickerstart' selected={StartDate} onChange={handleStartDateChange} />
        </div>
        <div >
          <label htmlFor="datepickerend">End Date</label>
          <DatePicker id='datepickerend' selected={EndDate} onChange={handleEndDateChange} />
        </div>
        </div>}
      <button disabled={anyChange === 0} className='addP' type='submit'> Update Product</button>
        <div className='successD' style={{ color: 'green' }}>
          Product Updated!
        </div>
        <div className='FailD' style={{ color: 'red' }}>
          Fail Update!
        </div>
    </form>}
  </div>);

}
export default UpdateProduct;