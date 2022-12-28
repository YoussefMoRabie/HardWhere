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

const UpdateStorage = () => {
  const storages = [];
  const { status, data: stoData } = useFetch(
    "http://localhost:1444/api/v1/getStorages"
  );
  for (const sto of stoData) {
    storages.push({
      label: sto.st_address,
      stid: sto.stid,
      maxCap: sto.max_capacity,
    });
  }

  const [anyChange, setAnyChange] = React.useState(0);
  const [MaxCapacity, setCapacity] = React.useState(1);
  const [selcted, setSelected] = React.useState(null);

  const handleStorageChange = (e, val) => {
    setSelected(val);
    setCapacity(val.maxCap);
  };
  const handleCapacityChange = (event) => {
    setAnyChange(1);
    event.target.value < 1
      ? (event.target.value = 1)
      : setCapacity(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(selcted);
    const res = await fetch(
      `http://localhost:1444/api/v1/updateStorage?stid=${selcted.stid}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          max_capacity: MaxCapacity,
        }),
      }
    );

    const { status } = await res.json();
    if (status === true) {
      setSelected(null);
      setCapacity(1);
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
        <span>Update Storage</span>
      </h3>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        value={selcted}
        onChange={handleStorageChange}
        options={storages}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Storage" />}
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
          <FormControl sx={{ margin: "10px" }}>
            <InputLabel required={true} htmlFor="outlined-adornment-amount">
              Maximum Capacity
            </InputLabel>
            <OutlinedInput
              required={true}
              type="number"
              id="outlined-adornment-amount"
              value={MaxCapacity}
              onChange={handleCapacityChange}
              label="Maximum Capacity"
            />
          </FormControl>
          <button
            className="addP"
            disabled={anyChange == 0}
            type="submit"
            onClick={handleSubmit}
          >
            {" "}
            Update Storage
          </button>
        </form>
      )}
      <div className="addedSuccessfully">Storage updated Successfully</div>
      <div className="tryagain"> try again</div>
    </div>
  );
};

export default UpdateStorage;
