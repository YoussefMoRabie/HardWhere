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
const products = [{
  img: "https://picsum.photos/200/300", label: "This is a label", id: 2, price: 299, rating: 2, count: 13

},
{
  img: "https://picsum.photos/600/500", id: 8, label: "This is a second label", price: 299, rating: 3, count: 13

},
{
  img: "https://picsum.photos/600/500", id: 12, label: "This is a second label", price: 299, rating: 3, count: 13

},
{
  img: "https://picsum.photos/600/500", id: 42, label: "This is a second label", price: 299, rating: 3, count: 13

},
{
  img: "https://picsum.photos/600/500", id: 52, label: "This is a second label", price: 299, rating: 3, count: 13

},
{
  img: "https://picsum.photos/600/500", id: 2, label: "This is a second label", price: 299, rating: 3, count: 13

},
{
  img: "https://picsum.photos/700/600", id: 3, label: "This is a third label", price: 299, rating: 1, count: 13

},
{
  img: "https://picsum.photos/500/400", id: 4, label: "This is a fourth label", price: 299, rating: 4, count: 13

},
{
  img: "https://picsum.photos/200/300", id: 5, label: "This is a fifth label", price: 299, rating: 5, count: 13

},
{
  img: "https://picsum.photos/800/700", id: 6, label: "This is a sixth label", price: 299, rating: 3, count: 13

},
{
  img: "https://picsum.photos/300/400", id: 7, label: "This is a seventh label", price: 299, rating: 3, count: 13

}]
const UpdateProduct = () => {

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [selcted, setSelected] = React.useState(null);
  const [URLcolor, setURLcolor] = React.useState('primary');;
  const [color, setColor] = React.useState({});
  const [Img, setImg] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [newprice, setnewPrice] = React.useState('');
  const [count, setCount] = React.useState('');
  const [addOffer, setaddOffer] = React.useState(false);
  const [anyChange, setAnyChange] = React.useState(0);
  const [StartDate, setStartDate] = React.useState(new Date());
  const [EndDate, setEndDate] = React.useState(new Date());

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
    setStartDate(date)
    console.log(date);
  }
  const handleSubmit = () => {

  };

  const handleCountChange = (event) => {
    setAnyChange(1);
    event.target.value < 1
      ? (event.target.value = 1)
      : setCount(event.target.value)
  }

  const handleProductChange = (e, v) => {
    setSelected(v);
    setPrice(v.price);
    setCount(v.count);
    setImg(v.img);
  }

  return (
  <div className='UpdateP' >
      <h3><span>Update Product</span></h3>

    <Autocomplete
      disablePortal
      id="combo-box-demo"
      value={selcted}
      onChange={handleProductChange}
      options={products}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Product" />}
    />
    {selcted && <form className='formAdd' onSubmit={handleSubmit}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          sx={{ flex: 1 }}
          required={true}
          id="outlined-number"
          label="Count"
          defaultValue={count}
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
      <button disabled={anyChange == 0} className='addP' type='submit' onSubmit={handleSubmit}> Update Product</button>
    </form>}
  </div>);

}
export default UpdateProduct;