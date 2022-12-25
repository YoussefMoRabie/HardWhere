import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import validator from "validator";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

const AddShipping = () => {
  const [compName, setcompName] = React.useState("");
  const [err, seterr] = React.useState(true);
  const [cost, setCost] = React.useState(1);
  const [deliveryTime, setDeliverytime] = React.useState(1);

  const handleNameChange = (e) => {
    if (!validator.isAlpha(e.target.value)) {
      seterr(true);
    } else {
      setcompName(e.target.value);
      seterr(false);
    }
  };
  const handleCostChange = (event) => {
    event.target.value < 1
      ? (event.target.value = 1)
      : setCost(event.target.value);
  };
  const handleTimeChange = (event) => {
    event.target.value < 1
      ? (event.target.value = 1)
      : setDeliverytime(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:1444/api/v1/addShipping`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        delivery_time: deliveryTime,
        cost: cost,
        sc_name: compName,
      }),
    });
    const { status } = await res.json();
    if (status === true) {
      setcompName("");
      setDeliverytime("");
      setCost("");
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
        <span>Add Shipping Company</span>
      </h3>
      <form
        action=""
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          gap: "15px",
        }}
        className="AddSupp"
      >
        <TextField
          id="outlined-basic"
          onChange={handleNameChange}
          sx={{ width: "300px" }}
          required
          label="Company Name"
          variant="outlined"
          value={compName}
        />
        <FormControl>
          <InputLabel required={true} htmlFor="outlined-adornment-amount">
            Cost
          </InputLabel>
          <OutlinedInput
            required={true}
            type="number"
            id="outlined-adornment-amount"
            value={cost}
            onChange={handleCostChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
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
          disabled={err}
          type="submit"
          onClick={handleSubmit}
        >
          {" "}
          Add Company
        </button>
        <div className="addedSuccessfully">Supplier Added Successfully</div>
        <div className="tryagain">Supplier Added Successfully</div>
      </form>
    </div>
  );
};

export default AddShipping;
