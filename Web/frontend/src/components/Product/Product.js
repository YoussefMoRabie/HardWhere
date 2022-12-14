import { useParams } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "./product.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// const {getDatatoCart}=require('../Cart/Cart')
const Btntheme = createTheme({
  typography: {
    fontFamily: "comfortaa",
  },
  palette: {
    primary: {
      main: "#efef18",
    },
    secondary: {
      main: "#251c57",
    },
  },
  shape: {
    borderRadius: 50,
  },
});
const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proName, setName] = useState("product" + id);
  const [price, setPrice] = useState(99.99);
  const [count, setcount] = useState(6);
  const [supplier, setSupplier] = useState("Apple");
  const [value, setValue] = useState(3);
  const [favorite, setFavorite] = useState(0);
  const [color, setColor] = useState("black");
  const [qty, setQty] = useState(1);
  const [desc, setDesc] = useState("product helw awi");

  const cartData = {
    pid: id,
    cust_ssn: 2, //must be dynamic later
    qty,
  };
  
  const AddporductToCart = async (req, res) => {
    try {
      fetch(`http://localhost:1444/api/v1/product/addtocart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartData),
      });
      navigate('/Cart');
    } catch (error) {
      console.log(error);
    }
  };

  let qtyarr = [];
  const data = [
    {
      userId: "02b",
      comId: "017",
      fullName: "Lily",
      userProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
      text: "I think you have a point🤔",
      avatarUrl: "https://ui-avatars.com/api/name=Lily&background=random",
      replies: [],
    },
  ];
  const inStock = count > 0 ? true : false;

  for (let i = 1; i <= count; i++) {
    qtyarr.push(i);
  }
  const labels = {
    0.5: "0.5",
    1: "1",
    1.5: "1.5",
    2: "2",
    2.5: "2.5",
    3: "3",
    3.5: "3.5",
    4: "4",
    4.5: "4.5",
    5: "5",
  };

  const fetchData = async () => {
    try {
      const data = await fetch(`http://localhost:1444/api/v1/product/${id}`);
      const data2 = await data.json();
      console.log(data2[0][0]);
      const productData = data2[0][0];
      setName(productData.product_name);
      setPrice(productData.price);
      setcount(productData.count);
      setColor(productData.color);
      setSupplier(productData.su_name);
      setValue(productData.rating);
      setFavorite(productData.favorite);
      setDesc(productData.desc);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  });
  return (
    <div className="propage">
      <div className="product">
        <div className="productimage">
          <img
            src="https://www.bestshop.com.py/img/1000x1000/products/13749/13749.jpg"
            alt={"product " + id}
          />
        </div>
        <div className="productinfo">
          <h2 className="proHead">{proName}</h2>
          <Box
            sx={{
              width: 200,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              name="text-feedback"
              value={Number(value)}
              readOnly
              precision={0.5}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            <Box sx={{ color: "orange", ml: 2 }}>{labels[Number(value)]}</Box>
          </Box>
          <p className="supp">
            Supplier:{" "}
            <span style={{ fontWeight: "bold", color: "#ff6666" }}>
              {" "}
              {supplier}
            </span>{" "}
          </p>
          <p className="proDesc">{desc}</p>
          {inStock && (
            <div>
              <p className="available">
                <span> {count} available </span> in stock
              </p>
              <div className="colors">
                <div
                  className={color + " color"}
                  style={{ width: 25, height: 25, backgroundColor: color }}
                ></div>
              </div>
              <div className="price"> {price}$</div>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Qty</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={qty}
                  label="qty"
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                >
                  {qtyarr.map((num) => (
                    <MenuItem value={num}>{num}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <ThemeProvider theme={Btntheme}>
                
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      display: "flex",
                      minWidth: 190,
                      color: "#251c57",
                      fontWeight: "bold",
                      margin: 2,
                    }}
                    onClick={() => {
                      AddporductToCart();
                      // history.push("/Cart");
                    }}
                    endIcon={<AddShoppingCartIcon />}
                  >
                    Add to Cart
                  </Button>
                
              </ThemeProvider>
            </div>
          )}
          {!inStock && <p className="notAvailable">Out Of Stock</p>}
        </div>
      </div>
      <h2 style={{ paddingLeft: 17 }}>Reviews</h2>
      <CommentSection
        titleStyle={{ content: "Reviews" }}
        currentUser={{
          currentUserId: "01a",
          currentUserImg:
            "https://ui-avatars.com/api/name=Mahmoud&background=random",
          currentUserProfile:
            "https://www.linkedin.com/in/riya-negi-8879631a9/",
          currentUserFullName: "Mahmoud Sobhy",
        }}
        logIn={{
          loginLink: "http://localhost:3001/",
          signupLink: "http://localhost:3001/",
        }}
        commentData={data}
        onSubmitAction={(data) => console.log("check submit, ", data)}
        currentData={(data) => {
          console.log("curent data", data);
        }}
      />
    </div>
  );
};

export default Product;
