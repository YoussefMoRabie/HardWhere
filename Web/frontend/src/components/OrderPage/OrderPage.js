import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Slider/Slider.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import "../ProductsPage/ProductsPage.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useLocation } from "react-router-dom";
import React from "react";
import { color } from "@mui/system";
import './Order.css'




const OrderPage = () => {
  const { state } = useLocation();
  const [orders, setOrders] = React.useState([{ date: '15 Oct,2022', products: [{ pid: 1, product_name: 'phone22', price: 200, img_link: 'https://m.media-amazon.com/images/I/81PXHmO+KeL._AC_SX679_.jpg' }, { pid: 1, product_name: 'phone22', price: 200, img_link: 'https://m.media-amazon.com/images/I/81PXHmO+KeL._AC_SX679_.jpg' }, { pid: 1, product_name: 'phone22', price: 200, img_link: 'https://m.media-amazon.com/images/I/81PXHmO+KeL._AC_SX679_.jpg' }, { pid: 1, product_name: 'phone22', price: 200, img_link: 'https://m.media-amazon.com/images/I/81PXHmO+KeL._AC_SX679_.jpg' }], price: 200 },
  { date: '12 Oct,2022', products: [{ pid: 1, product_name: 'phone22', price: 200, img_link: 'https://m.media-amazon.com/images/I/81PXHmO+KeL._AC_SX679_.jpg' }, { pid: 1, product_name: 'phone22', price: 200, img_link: 'https://m.media-amazon.com/images/I/81PXHmO+KeL._AC_SX679_.jpg' }], price: 400 },
  { date: '10 Oct,2022', products: [{ pid: 1, product_name: 'phone22', price: 200, img_link: 'https://m.media-amazon.com/images/I/81PXHmO+KeL._AC_SX679_.jpg' }, { pid: 1, product_name: 'phone22', price: 200, img_link: 'https://m.media-amazon.com/images/I/81PXHmO+KeL._AC_SX679_.jpg' }, { pid: 1, product_name: 'phone22', price: 200, img_link: 'https://m.media-amazon.com/images/I/81PXHmO+KeL._AC_SX679_.jpg' }], price: 900 },
  { date: '9 Oct,2022', products: [{ pid: 1, product_name: 'phone22', price: 200, img_link: 'https://m.media-amazon.com/images/I/81PXHmO+KeL._AC_SX679_.jpg' }, { pid: 1, product_name: 'phone22', price: 200, img_link: 'https://m.media-amazon.com/images/I/81PXHmO+KeL._AC_SX679_.jpg' }], price: 100 }])
  console.log("user", state);

  const { categoryVal: parm } = useParams();
  const his = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const dataRes = await fetch(`http://localhost:1444/api/v1/mobiles`);
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
        <span>Your Orders</span>
      </h3>
      <div style={{ justifyContent: 'start' }} className="showproducts">
        {orders && orders.map(order => (
          <div className="eachorder">
            <p className="orderDate" >Order at <span style={{ color: '#fc2a5c' }}>{order.date}</span></p>
            {order.products && order.products.map((product, index) => (
              <div
                className="ordCard slider-card"
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
                  <p className="slider-card-price">{product.price}$</p>
                </div>
              </div>
            ))}
            <p className="orderDate" >Total Cost: <span style={{ color: '#fc2a5c' }}>{order.price}$</span></p>
            <hr />
          </div>))}
      </div>
    </div>
  );
};

export default OrderPage;
