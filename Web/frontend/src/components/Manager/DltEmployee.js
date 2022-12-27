import Autocomplete from "@mui/material/Autocomplete";
import * as React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import "./AddProduct.css";
import useFetch from "../useFetch";
import { useEffect } from "react";
import { useState } from "react";

const DeleteEmployee = () => {
  const employees = [];
  // const [employeesData, setEmps] = useState([]);

  // const { status, data } = useFetch(
  //   "http://localhost:1444/api/v1/getEmployees"
  // );
  // for (const emp of data) {
  //   employees.push({ label: emp.fullname, ssn: emp.ssn });
  // }
  // setEmps(data);
  const getEmployees = async () => {
    try {
      const dataRes = await fetch("http://localhost:1444/api/v1/getEmployees");
      const { data } = await dataRes.json();

      for (const emp of data) {
        if (emp.fullname !== null) {
          employees.push({ label: emp.fullname, ssn: emp.ssn });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  getEmployees();

  const [selected, setSelected] = React.useState(null);

  const handleEmployeeChange = (e, v) => {
    setSelected(v);
  };

  console.log(selected);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:1444/api/v1/deleteEmployee?ssn=${selected.ssn}`,
        {
          method: "DELETE",
        }
      );
      console.log("del");

      const objWithIdIndex = employees.findIndex(
        (obj) => obj.ssn === selected.ssn
      );
      employees.splice(objWithIdIndex, 1);

      setSelected(null);
      const { status } = await res.json();
      if (status === true) {
        document.querySelector(".addedSuccessfully").classList.add("active");
        setTimeout(() => {
          document
            .querySelector(".addedSuccessfully")
            .classList.remove("active");
        }, 3000);
      } else {
        document.querySelector(".tryagain").classList.add("active");
        setTimeout(() => {
          document.querySelector(".tryagain").classList.remove("active");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="DeleteP">
      <h3>
        <span>Delete Employee</span>
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
      <button
        disabled={!selected}
        className="addP"
        type="submit"
        onClick={handleSubmit}
      >
        {" "}
        Delete Employee
      </button>
      <div className="addedSuccessfully">Employee deleted Successfully</div>
      <div className="tryagain"> try again</div>
    </div>
  );
};

export default DeleteEmployee;
