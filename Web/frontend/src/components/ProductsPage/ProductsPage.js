import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Slider/Slider.css";
import "./ProductsPage.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useLocation } from "react-router-dom";
const ProductsPage = () => {
  const { state } = useLocation();
  console.log("user", state);

  const { searchVal: parm } = useParams();
  console.log(parm);
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
            key={index}
            onClick={(e) => {
              his(`/product/${product.pid}`, { state: state });
            }}
          >
            <div
              className="slider-card-image"
              style={{
                backgroundImage: `url(${product.img_link})`,
                backgroundSize: "cover",
              }}
            ></div>
            <p className="slider-card-title">{product.product_name}</p>
            <Rating
              className="slider_rating"
              name="half-rating-read"
              defaultValue={product.p_value}
              precision={0.5}
              size="small"
              readOnly
            />
            <p className="slider-card-price">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
