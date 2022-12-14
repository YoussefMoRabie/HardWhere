import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React, { useState, useEffect } from "react";
import "./OffersSlider.css";
import Button from "@mui/material/Button";
import { BsCartCheckFill } from "react-icons/bs";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
// const { AddporductToCart } = require("../../Product/Product");

const OfferCard = () => {
  const [OfferData, setOfferData] = useState([
    {
      img: "https://www.bestshop.com.py/img/1000x1000/products/13749/13749.jpg",
      name: "description",
      start_date: "20/20/2020",
      end_date: "20/20/3002",
      newprice: "20$",
      desc: "description",
      oldPrice: "50$",
      value: 3,
    },
    {
      img: "https://www.bestshop.com.py/img/1000x1000/products/13749/13749.jpg",
      name: "phone25154",
      start_date: "20/20/2020",
      end_date: "20/20/3002",
      newprice: "20",
      oldPrice: "50",
      desc: "description",
      value: 3,
    },
  ]);
  const getOffersData = async () => {
    try {
      const data = await fetch("http://localhost:1444/api/v1/getOffers");
      const data2 = await data.json();
      console.log(data2);
      setOfferData(data2[0]);
      setcount(data2[0].length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOffersData();
  }, []);

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
  const [count, setcount] = useState(3);
  const settings = {
    // dots: true,               //add it if you want
    infinite: true,
    speed: 1000,
    slidesToShow: count <= 2 ? count : 3,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <>
      <Slider {...settings}>
        {OfferData.map((product, index) => {
          return (
            <div className="productOffer" key={index}>
              <div className="left">
                <h3>{product.product_name}</h3>
                <Box
                  sx={{
                    width: 200,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Rating
                    name="text-feedback"
                    value={Number(product.rating)}
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  <Box sx={{ color: "orange", ml: 2 }}>
                    {labels[Number(product.rating)]}
                  </Box>
                </Box>
                <p>{product.desc}</p>

                <p>
                  Start Date: <span>{product.start_date}</span>
                </p>
                <p>
                  End Date:{" "}
                  <span>{product.end_date.toString().slice(0, 24)}</span>
                </p>
                <p>
                  Old Price:{" "}
                  <span className="oldPrice">{`${product.price}$`}</span>
                </p>
                <p>
                  New Price: <span>{`${product.new_price}$`}</span>
                </p>
                <Link to="/Cart" className="Link">
                  <Button
                    className="addCartBtn"
                    endIcon={<BsCartCheckFill className="BsCartCheckFill" />}
                    variant="contained"
                    color="primary"
                    onClick={()=>{
                      console.log(2);
                      try {
                        fetch(
                          `http://localhost:1444/api/v1/product/addtocart`,
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              pid: product.pid,
                              cust_ssn: 2, //must be dynamic later
                              qty: 1,
                            }),
                          }
                        );
                        console.log("added");
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    Add To Cart!
                  </Button>
                </Link>
              </div>
              <div className="right">
                <img
                  src="https://www.bestshop.com.py/img/1000x1000/products/13749/13749.jpg"
                  alt="loading..."
                />
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default OfferCard;
