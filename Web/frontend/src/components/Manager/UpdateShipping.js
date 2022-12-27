import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ReactPhoneInput from "react-phone-input-mui";
import validator from "validator";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { withStyles } from "@material-ui/core";
import useFetch from "../useFetch";

const UpdateShipping = () => {
  const companies = [];

  const { status, data: shippData } = useFetch(
    "http://localhost:1444/api/v1/shippingCompany_Data"
  );
  for (const cmp of shippData) {
    companies.push({
      label: cmp.sc_name,
      scid: cmp.scid,
      cost: cmp.cost,
      delv_time: cmp.delivery_time,
    });
  }
  const [anyChange, setAnyChange] = React.useState(0);
  const [cost, setCost] = React.useState(1);
  const [deliveryTime, setTime] = React.useState(1);
  const [selcted, setSelected] = React.useState(null);

  const handleStorageChange = (e, val) => {
    setSelected(val);
    setCost(val.cost);
    setTime(val.delv_time);
  };
  const handleCostChange = (event) => {
    setAnyChange(1);
    event.target.value < 1
      ? (event.target.value = 1)
      : setCost(event.target.value);
  };
  const handleTimeChange = (event) => {
    setAnyChange(1);
    event.target.value < 1
      ? (event.target.value = 1)
      : setTime(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selcted);
    const res = await fetch(
      `http://localhost:1444/api/v1/updateShipping?scid=${selcted.scid}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cost: cost,
          delivery_time: deliveryTime,
        }),
      }
    );

    const { status } = await res.json();
    if (status === true) {
      setSelected(null);
      setCost(1);
      setTime(1);
      document.querySelector(".addedSuccessfully").classList.add("active");
      setTimeout(() => {
        document.querySelector(".addedSuccessfully").classList.remove("active");
      }, 3000);
    } else {
      document.querySelector(".tryagain").classList.add("active");
      setTimeout(() => {
        document.querySelector(".tryagain").classList.remove("active");
      }, 3000);
    }
  };

  return (
    <div className="addA">
      <h3>
        <span>Update Company</span>
      </h3>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        value={selcted}
        onChange={handleStorageChange}
        options={companies}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Company" />}
      />
      {selcted && (
        <form
          action=""
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            gap: "2px",
          }}
          className="AddSupp"
        >
          <FormControl sx={{ marginTop: "10px", marginBottom: "10px" }}>
            <InputLabel required={true} htmlFor="outlined-adornment-amount">
              Cost
            </InputLabel>
            <OutlinedInput
              required={true}
              type="number"
              id="outlined-adornment-amount"
              value={cost}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              onChange={handleCostChange}
              label="Cost"
            />
          </FormControl>
          <FormControl>
            <InputLabel required={true} htmlFor="outlined-adornment-amount">
              Delivery Days
            </InputLabel>
            <OutlinedInput
              required={true}
              type="number"
              id="outlined-adornment-amount"
              value={deliveryTime}
              onChange={handleTimeChange}
              label="Delivery Days"
            />
          </FormControl>
          <button
            className="addP"
            disabled={anyChange == 0}
            type="submit"
            onClick={handleSubmit}
          >
            {" "}
            Update Comapny
          </button>
        </form>
      )}
      <div className="addedSuccessfully">Company Updated Successfully</div>
      <div className="tryagain"> try again</div>
    </div>
  );
};

export default UpdateShipping;
