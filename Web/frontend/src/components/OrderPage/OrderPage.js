import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Slider/Slider.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../ProductsPage/ProductsPage.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useLocation } from "react-router-dom";
import React from "react";
import { color } from "@mui/system";
import "./Order.css";
import useFetch from "../useFetch";

const OrderPage = () => {
  const { state } = useLocation();
  let orders = [];
  console.log("user", state);

  const { categoryVal: parm } = useParams();
  const his = useNavigate();

  const { data: ordersData } = useFetch(
    `http://localhost:1444/api/v1/getOrders?ssn=${state.ssn}`
  );

  orders = ordersData;

  return (
    <div className="proPage">
      <h3>
        {" "}
        <span>Your Orders</span>
      </h3>
      <div style={{ justifyContent: "start" }} className="showproducts">
        {orders &&
          orders.map((order) => (
            <div className="eachorder">
              <p className="orderDate">
                Order at{" "}
                <span style={{ color: "#fc2a5c" }}>
                  {order.date.slice(0, 10)}
                </span>
              </p>
              {order.products &&
                order.products.map((product, index) => (
                  <div className="ordCard slider-card" key={product.pid}>
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
                    <p
                      onClick={(e) => {
                        his(`/product/${product.pid}`, { state: state });
                      }}
                      className="slider-card-title"
                    >
                      {product.product_name}
                    </p>
                    <Rating
                      className="slider_rating"
                      name="half-rating-read"
                      defaultValue={product.p_value}
                      precision={0.5}
                      size="small"
                      readOnly
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p className="slider-card-price">{product.price}$</p>
                    </div>
                  </div>
                ))}
              <p className="orderDate">
                Total Cost:{" "}
                <span style={{ color: "#fc2a5c" }}>{order.price}$</span>
              </p>
              <hr />
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrderPage;
