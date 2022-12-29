import Autocomplete from '@mui/material/Autocomplete';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import './AddProduct.css'
import useFetch from "../useFetch";

const DeleteProduct = () => {
  const [products,setPro] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
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
  const handleProductChange = (e, v) => {
    setSelected(v);
    
  }

  const handleSubmit = async () => {
    console.log(selected);
    const res = await fetch(
      `http://localhost:1444/api/v1/deleteproduct`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pid: selected.pid,
          st_id: selected.st_id,
          count: selected.count
        }),
      }
    );
    const { status } = await res.json();
    if (status === true) {
      setSelected(null);
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
    setPro(products.filter(p => p.pid !== selected.pid));
    }
  return ( <div style={{minHeight:'800px'}} className="DeleteP">
    <h3><span>Delete Product</span></h3>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      clearText='true'
      value={selected}
      getOptionLabel={(op)=>op.product_name}
      isOptionEqualToValue={(op,va)=>op.product_name==va.product_name}
      onChange={handleProductChange}
      options={products}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Product" />}
    />
    <button disabled={!selected} className='addP' type='submit' onClick={handleSubmit}> Delete Product</button>
    <div className='successD' style={{color:'green'}}>
      Product Deleted!
      </div>
    <div className='FailD' style={{ color: 'red' }}>
          Fail Deletion!
      </div>
  </div> );
};
export default DeleteProduct;