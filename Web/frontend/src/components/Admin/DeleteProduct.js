import Autocomplete from '@mui/material/Autocomplete';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import './AddProduct.css'

const DeleteProduct = () => {
  const products = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
      label: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
  ];
  const [selcted, setSelected] = React.useState(null);
  const handleProductChange = (e, v) => {
    setSelected(v);
  }
  return ( <div className="DeleteP">
    <h3><span>Delete Product</span></h3>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      value={selcted}
      onChange={handleProductChange}
      options={products}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Product" />}
    />
    <button disabled={!selcted} className='addP' type='submit'> Delete Product</button>

  </div> );
}
 
export default DeleteProduct;