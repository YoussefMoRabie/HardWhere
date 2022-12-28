import Autocomplete from '@mui/material/Autocomplete';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import './AddProduct.css'
import useFetch from "../useFetch";
import {useNavigate} from "react-router-dom";

const DeleteProduct = () => {
  const products = [];
  const [selected, setSelected] = React.useState(null);
  const history = useNavigate();
  const { data: Data } = useFetch(
    "http://localhost:1444/api/v1/getAllProducts"
  );
  for (const item of Data) {
    products.push({
      label: item.product_name,
      pid: item.pid,
    });
  };

  const handleProductChange = (e, v) => {
    setSelected(v);
  }

  const handleSubmit = async (e) => {
    const res = await fetch(
      `http://localhost:1444/api/v1/deleteproduct`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pid: selected.pid,
        }),
      }
    );
    history(0);
    }
  return ( <div className="DeleteP">
    <h3><span>Delete Product</span></h3>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      value={selected}
      onChange={handleProductChange}
      options={products}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Product" />}
    />
    <button disabled={!selected} className='addP' type='submit' onClick={handleSubmit}> Delete Product</button>

  </div> );
};
export default DeleteProduct;