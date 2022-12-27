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
import useFetch from "../useFetch";

const UpdateEmployee = () => {
  const { status, data: empData } = useFetch(
    "http://localhost:1444/api/v1/getEmployees"
  );

  const departments = [];
  const { data: depData } = useFetch(
    "http://localhost:1444/api/v1/getDepartments"
  );
  for (const dep of depData) {
    departments.push({ label: dep.d_name, d_id: dep.did });
  }

  const employees = [];
  for (const emp of empData) {
    if (emp.fullname !== null)
      employees.push({
        label: emp.fullname,
        ssn: emp.ssn,
        salary: emp.salary,
        department: departments.find((item) => item.d_id === emp.d_id),
        working_shift: emp.working_shift,
      });
  }

  const shifts = ["Night", "Day"];
  const [anyChange, setAnyChange] = React.useState(0);
  const [salary, setSalary] = React.useState(0);
  const [shift, setShift] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [selected, setSelected] = React.useState(null);

  const handleEmployeeChange = (e, val) => {
    setSelected(val);
    setSalary(val.salary);
    setShift(val.working_shift);
    setDepartment(val.department);
  };
  const handleSalaryChange = (event) => {
    setAnyChange(1);
    event.target.value < 1
      ? (event.target.value = 1)
      : setSalary(event.target.value);
  };
  const handleShiftChange = (e, val) => {
    setShift(val);
    setAnyChange(1);
  };
  const handleDepartmentChange = (e, val) => {
    setDepartment(val);
    setAnyChange(1);
  };

  const handleSubmit = (e) => {
  e.preventDefault();
    console.log(department);
    console.log(shift);
    console.log(salary);

    


  };

  return (
    <div className="addA">
      <h3>
        <span>Update Employee</span>
      </h3>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        value={selected}
        onChange={handleEmployeeChange}
        options={employees}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Employee" />}
      />
      {selected && (
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
              Salary
            </InputLabel>
            <OutlinedInput
              required={true}
              type="number"
              id="outlined-adornment-amount"
              value={salary}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
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
            renderInput={(params) => (
              <TextField {...params} label="Department" />
            )}
          />

          <button
            className="addP"
            disabled={anyChange == 0}
            type="submit"
            onClick={handleSubmit}
          >
            {" "}
            Update Employee
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateEmployee;
