import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import validator from "validator";
import Autocomplete from "@mui/material/Autocomplete";
import ReactPhoneInput from "react-phone-input-mui";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
const AddAdmin = () => {
  const [newadmin, setnewAdmin] = React.useState("");
  const [err, seterr] = React.useState(false);
  const [errMsg, seterrMsg] = React.useState("");
  const [salary, setSalary] = React.useState(0);
  const [shift, setShift] = React.useState("");
  const shifts = ["Night", "Day"];
  const departments = ["dummy1", "dummy2"];
  const [department, setDepartment] = React.useState("");
  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
  };
  const handleShiftChange = (e, val) => {
    setShift(val);
  };
  const handleDepartmentChange = (e, val) => {
    setDepartment(val);
  };
  const handlemailChange = (e) => {
    seterrMsg("");
    if (validator.isEmail(e.target.value)) {
      setnewAdmin(e.target.value);
      seterr(false);
    } else {
      seterr(true);
    }
  };
  const handleSubmit = () => {
    if (newadmin == "") {
      seterrMsg("Please Enter a valid User Email!");
      seterr(true);
      return false;
    }
    seterrMsg("");
  };
  return (
    <div className="addA">
      <h3>
        <span>Add New Admin</span>
      </h3>

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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            sx={{ width: 300 }}
            error={err}
            required
            onChange={handlemailChange}
            id="outlined-basic"
            label="User Email"
            variant="outlined"
          />
          <label style={{ color: "red", fontSize: "11px", padding: "2px" }}>
            {errMsg}
          </label>
        </div>

        <FormControl sx={{ marginTop: "10px", marginBottom: "10px" }}>
          <InputLabel required={true} htmlFor="outlined-adornment-amount">
            Salary
          </InputLabel>
          <OutlinedInput
            required={true}
            type="number"
            id="outlined-adornment-amount"
            value={salary}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            onChange={handleSalaryChange}
            label="Cost"
          />
        </FormControl>

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          value={shift}
          onChange={handleShiftChange}
          options={shifts}
          sx={{ width: 300, marginTop: "10px", marginBottom: "10px" }}
          renderInput={(params) => <TextField {...params} label="Shift" />}
        />

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          value={department}
          onChange={handleDepartmentChange}
          options={departments}
          sx={{ width: 300, marginTop: "10px", marginBottom: "10px" }}
          renderInput={(params) => <TextField {...params} label="Department" />}
        />

        <button
          disabled={err == true}
          className="addP"
          type="submit"
          onClick={handleSubmit}
        >
          {" "}
          Add Admin
        </button>
      </form>
    </div>
  );
};

export default AddAdmin;
