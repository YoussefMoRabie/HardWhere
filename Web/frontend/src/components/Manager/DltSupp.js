import Autocomplete from "@mui/material/Autocomplete";
import * as React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import "./AddProduct.css";

const DeleteSupplier = () => {
  const suppliers = [

  ];
  const [selected, setSelected] = React.useState(null);
  const handleSupplierChange = (e, v) => {
    setSelected(v);
  };

  const getsuppliers = async () => {
    try {
      const dataRes = await fetch("http://localhost:1444/api/v1/getsuppliers");
      const { data } = await dataRes.json();

      for (const sto of data) {
        suppliers.push({
          label: sto.st_address,
          stid: sto.stid,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getsuppliers();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:1444/api/v1/deleteFromsuppliers?stid=${selected.stid}`,
        {
          method: "DELETE",
        }
      );
      console.log("del");

      const objWithIdIndex = suppliers.findIndex(
        (obj) => obj.stid === selected.stid
      );
      suppliers.splice(objWithIdIndex, 1);

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
        <span>Delete Suppplier</span>
      </h3>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        value={selected}
        onChange={handleSupplierChange}
        options={suppliers}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Supplier" />}
      />
      <button
        disabled={!selected}
        className="addP"
        type="submit"
        onClick={handleSubmit}
      >
        {" "}
        Delete Supplier
      </button>
      <div className="addedSuccessfully">Storage deleted Successfully</div>
      <div className="tryagain"> try again</div>
    </div>
  );
};

export default DeleteSupplier;
