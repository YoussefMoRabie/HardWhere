import Autocomplete from "@mui/material/Autocomplete";
import * as React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import "./AddProduct.css";

const DeleteCompany = () => {
  const companies = [];

  const [selected, setSelected] = React.useState(null);
  const handleCompanyChange = (e, v) => {
    setSelected(v);
  };

  const getcompanies = async () => {
    try {
      const dataRes = await fetch(
        "http://localhost:1444/api/v1/shippingCompany_Data"
      );
      const { data } = await dataRes.json();

      for (const cmp of data) {
        companies.push({
          label: cmp.sc_name,
          scid: cmp.scid,
          cost: cmp.cost,
          delv_time: cmp.delivery_time,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getcompanies();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:1444/api/v1/deleteShippingCompany?scid=${selected.scid}`,
        {
          method: "DELETE",
        }
      );
      console.log("del");

      const objWithIdIndex = companies.findIndex(
        (obj) => obj.scid === selected.scid
      );
      companies.splice(objWithIdIndex, 1);

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
        <span>Delete Company</span>
      </h3>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        value={selected}
        onChange={handleCompanyChange}
        options={companies}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Company" />}
      />
      <button
        disabled={!selected}
        className="addP"
        type="submit"
        onClick={handleSubmit}
      >
        {" "}
        Delete Company
      </button>
      <div className="addedSuccessfully">Employee deleted Successfully</div>
      <div className="tryagain"> try again</div>
    </div>
  );
};

export default DeleteCompany;
