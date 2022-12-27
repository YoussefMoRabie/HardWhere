import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ReactPhoneInput from "react-phone-input-mui";
import validator from "validator";
import { withStyles } from "@material-ui/core";
import useFetch from "../useFetch";

const styles = (theme) => ({
  field: {
    margin: "10px 0",
  },
  countryList: {
    ...theme.typography.body1,
  },
});

const UpdateSupplier = () => {
  const Suppliers = [];

  const { status, data: suppData } = useFetch(
    "http://localhost:1444/api/v1/getAllSuppliers"
  );

  for (const supp of suppData) {
    Suppliers.push({
      label: supp.su_name,
      address: supp.su_address,
      phone: supp.su_phone,
      suid: supp.suid,
    });
  }

  const [anyChange, setAnyChange] = React.useState(0);

  const [selcted, setSelected] = React.useState(null);
  const [Address, setAddress] = React.useState("");

  const [phone, setphone] = React.useState("");
  const [err, seterr] = React.useState(true);
  const handlePhoneChange = (value) => {
    setphone(value);
    if (!validator.isMobilePhone(value)) {
      seterr(true);
      setAnyChange(0);
    } else {
      seterr(false);
      setAnyChange(1);
    }
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setAnyChange(1);
  };
  const handleSupplierChange = (e, val) => {
    setSelected(val);
    setphone(val.phone);
    setAddress(val.address);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selcted);
    const res = await fetch(
      `http://localhost:1444/api/v1/updateSupplier?suid=${selcted.suid}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: Address,
          phone,
        }),
      }
    );

    const { status } = await res.json();
    if (status === true) {
      setSelected(null);
      setAddress("");
      setphone("");
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
        <span>Update Supplier</span>
      </h3>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        value={selcted}
        onChange={handleSupplierChange}
        options={Suppliers}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Supplier" />}
      />
      {selcted && (
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
            value={Address}
            onChange={handleAddressChange}
            sx={{ width: "300px" }}
            required
            label="Address"
            variant="outlined"
          />
          <ReactPhoneInput
            value={phone}
            defaultCountry={"eg"}
            onChange={handlePhoneChange}
            countryCodeEditable={false}
            component={TextField}
            label="Phone"
            // inputExtraProps={{
            //   margin: 'normal',
            //   autoComplete: 'phone',
            //   name: 'phone'
            // }}
          />
          <button
            className="addP"
            disabled={anyChange == 0 || err}
            type="submit"
            onClick={handleSubmit}
          >
            {" "}
            Update Supplier
          </button>
        </form>
      )}
      <div className="addedSuccessfully">
        supplier data Updated Successfully
      </div>
      <div className="tryagain"> try again</div>
    </div>
  );
};

export default UpdateSupplier;
