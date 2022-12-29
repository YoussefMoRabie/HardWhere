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
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const UserPage = () => {
  const { state } = useLocation();
  const navigateTo = useNavigate();
  console.log(state);

  const [phone, setphone] = React.useState(0);
  const [address, setAddress] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [anyChange, setAnyChange] = React.useState(0);
  const [err, seterr] = React.useState(true);
  const [errMsg, seterrMsg] = React.useState("");
  const [shown, setShown] = useState(false);

  const HandelShow = (e) => {
    e.preventDefault();

    setEmail(state.email);
    setphone(state.phone);
    setAddress(state.address);
    setPassword(state.password);
    if (shown) {
      setShown(false);
      document.getElementById("showbtn").innerText = "Show My Info";
    } else {
      setShown(true);
      document.getElementById("showbtn").innerText = "Hide My Info";
    }
  };

  const handlePhoneChange = (value) => {
    setphone(value);
    seterr(false);
    // if (!validator.isMobilePhone(value)) {
    //   seterr(true);
    //   setAnyChange(0);
    // } else {

    //   setAnyChange(1);
    // }
  };

  const handlemailChange = (e) => {
    seterrMsg("");
    if (validator.isEmail(e.target.value)) {
      setEmail(e.target.value);
      seterr(false);
    } else {
      seterr(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setShown(false);
    const res = await fetch(
      `http://localhost:1444/api/v1/updateUserData?ssn=${state.ssn}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          address,
          email,
          password,
        }),
      }
    );

    const { status } = await res.json();

    if (status === true) {
      document.querySelector(".addedSuccessfully").classList.add("active");
      setTimeout(() => {
        document.querySelector(".addedSuccessfully").classList.remove("active");
      }, 3000);
      setTimeout(() => {
        navigateTo("/Signin");
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
        <Link to="/orders" state={state}>
          <button
            style={{
              fontSize: "18px",
              marginBottom: "13px",
              position: "relative",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            className="addP"
            type="submit"
          >
            {" "}
            My Orders
          </button>
        </Link>
        <button
          style={{ fontSize: "18px", marginBottom: "13px" }}
          className="addP"
          id="showbtn"
          type="submit"
          onClick={HandelShow}
        >
          {" "}
          Show My Info
        </button>
        <br />

        {shown && (
          <>
            <h3>
              <span>Your Data</span>
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "20px",
              }}
            >
              <TextField
                sx={{ width: 300 }}
                error={err}
                required
                onChange={handlemailChange}
                id="outlined-basic"
                label="User Email"
                variant="outlined"
                value={email}
              />
              <br />

              <ReactPhoneInput
                value={phone}
                defaultCountry={"eg"}
                onChange={handlePhoneChange}
                countryCodeEditable={false}
                component={TextField}
                label="Phone"
              />

              <br />
              <TextField
                sx={{ width: 300 }}
                required
                onChange={(e) => {
                  setAddress(e.target.value);
                  seterr(false);
                }}
                id="outlined-basic"
                label="Address"
                value={address}
                variant="outlined"
              />
              <br />

              <TextField
                sx={{ width: 300 }}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                  seterr(false);
                }}
                id="outlined-basic"
                label="password"
                value={password}
                variant="outlined"
              />
            </div>
            <button
              disabled={err === true}
              className="addP"
              type="submit"
              onClick={handleSubmit}
            >
              {" "}
              Update
            </button>
          </>
        )}

        <div className="addedSuccessfully">Updated Successfully</div>
        <div className="tryagain">try again</div>
      </form>
    </div>
  );
};

export default UserPage;
