import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Slider/Slider.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./ProductsPage.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useLocation } from "react-router-dom";
import React from "react";
import { color } from "@mui/system";


  
 
const ProductsPage = () => {
  const { state } = useLocation();
  const [addfav,setaddtofav]=React.useState(null);
  const [Favs,setFavs]=React.useState([]);
  console.log("user", state);
  useEffect(()=>{
    const getFav = async () => {
      try {
        const dataRes = await fetch(`http://localhost:1444/api/v1/getFavorite?ssn=${state.ssn}`);
        const { data } = await dataRes.json();
        setFavs(data);
        console.log('Favs', Favs)
      } catch (error) {
        console.log(error);
      }
    }
    getFav();
},[])
  

  const addtofav = async (id) => {
  const res = await fetch(`http://localhost:1444/api/v1/addToFavorite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pid: parseInt(id),
      ssn: state.ssn
    }),
  });
  console.log(res);
}

  const handleFavouriteClick = (e) => {
    e.target.style.color = '#faaf00'
    setaddtofav(e.currentTarget.dataset.pid);
    addtofav(e.currentTarget.dataset.pid);
  }
 const checkFav=(product)=> Favs.find((elem) => elem.pid == product.pid) ? true :false;

 
  const { categoryVal: parm } = useParams();
  const his = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const dataRes = await fetch(`http://localhost:1444/api/v1/${parm}`);
        const { data } = await dataRes.json();
        console.log("products", data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [parm, his]);

  return (
    <div className="proPage">
      <h3>
        {" "}
        <span>{parm}</span>
      </h3>
      <div className="showproducts">
        {products.map((product, index) => (
          <div
            className="slider-card"
            key={product.pid}
          >
            <div
              className="slider-card-image"
              onClick={(e) => {
                his(`/product/${product.pid}`, { state: state });
              }}
              style={{
                backgroundImage: `url(${product.img_link})`,
                backgroundSize: "cover",
              }}
            ></div>
            <p onClick={(e) => {
              his(`/product/${product.pid}`, { state: state });
            }} className="slider-card-title">{product.product_name}</p>
            <Rating
              className="slider_rating"
              name="half-rating-read"
              defaultValue={product.p_value}
              precision={0.5}
              size="small"
              readOnly
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {state !== null &&!checkFav(product) && <FavoriteIcon color='disabled'  data-pid={product.pid} onClick={handleFavouriteClick} />}
              {state !== null && checkFav(product) && <FavoriteIcon sx={{ color:'#faaf00'}}  data-pid={product.pid} onClick={handleFavouriteClick} />}
              <p className="slider-card-price">{product.price}$</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
