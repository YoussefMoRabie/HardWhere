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
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const OfferCard = () => {
  //cust_ssn
  const { state } = useLocation();
  console.log(state);

  const [OfferData, setOfferData] = useState([]);
  const getOffersData = async () => {
    try {
      const dataRes = await fetch("http://localhost:1444/api/v1/getOffers");
      const {data} = await dataRes.json();
      console.log(data);
      setOfferData(data);
      setcount(data.length);
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
  const navigate = useNavigate();
  return (
    <>
      <h2 className="CategoryName">
        {" "}
        <span>Offers</span>
      </h2>
      <Slider {...settings}>
        {OfferData.map((product, index) => {
          return (
            <div
              className="productOffer"
              key={index}
              onClick={(e) => {
                navigate(`product/${product.pid}`);
              }}
            >
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
                    value={Number(product.p_value)}
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
                  Start Date:{" "}
                  <span>{product.start_date.toString().slice(0, 10)}</span>
                </p>
                <p>
                  End Date:{" "}
                  <span>{product.end_date.toString().slice(0, 10)}</span>
                </p>
                <p>
                  Old Price:{" "}
                  <span className="oldPrice">{`${product.price}$`}</span>
                </p>
                <p>
                  New Price: <span>{`${product.new_price}$`}</span>
                </p>
                {state && product.count > 0 && (
                  <Button
                    className="addCartBtn"
                    endIcon={<BsCartCheckFill className="BsCartCheckFill" />}
                    variant="contained"
                    color="primary"
                    onClick={() => {
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
                              cust_ssn: state.ssn,
                              qty: 1,
                            }),
                          }
                        );
                        console.log("added");
                        navigate("/Cart", { state: state });
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    Add To Cart!
                  </Button>
                )}
                {product.count <= 0 && (
                  <h3 style={{ margin: "16px 0px" }}>SOLD</h3>
                )}
              </div>
              <div className="right">
                <img src={product.img_link} alt={product + product.pid} />
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default OfferCard;
