import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React from "react";
import "./OffersSlider.css";
import Button from "@mui/material/Button";
import { BsCartCheckFill } from "react-icons/bs";
//DB request latter
let OfferData = [
  {
    img: "https://www.bestshop.com.py/img/1000x1000/products/13749/13749.jpg",
    name: "description",
    StartDate: "20/20/2020",
    endDate: "20/20/3002",
    newPrice: "20$",
    desc: "description",
    oldPrice: "50$",
  },
  {
    img: "https://www.bestshop.com.py/img/1000x1000/products/13749/13749.jpg",
    name: "phone25154",
    StartDate: "20/20/2020",
    endDate: "20/20/3002",
    newPrice: "20$",
    oldPrice: "50$",
    desc: "description",
  },
  {
    img: "https://www.bestshop.com.py/img/1000x1000/products/13749/13749.jpg",
    name: "phone25154",
    desc: "description",
    StartDate: "20/20/2020",
    endDate: "20/20/3002",
    newPrice: "20$",
    oldPrice: "50$",
  },
  {
    img: "https://www.bestshop.com.py/img/1000x1000/products/13749/13749.jpg",
    name: "phone25154",
    desc: "description",
    StartDate: "20/20/2020",
    endDate: "20/20/3002",
    newPrice: "20$",
    oldPrice: "50$",
  },
  {
    img: "https://www.bestshop.com.py/img/1000x1000/products/13749/13749.jpg",
    name: "phone25154",
    desc: "description",
    StartDate: "20/20/2020",
    endDate: "20/20/3002",
    newPrice: "20$",
    oldPrice: "50$",
  },
];

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block" }}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block" }}
//       onClick={onClick}
//     />
//   );
// }
const OfferCard  = () => {

  const settings = {
    // dots: true,               //add it if you want
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    // appendDots: (Dots) => {
    //   return <ul>{Dots}</ul>;
    // },
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  };
  return (
    <>
      <Slider {...settings}>
        {OfferData.map((product, index) => {
          return (
            <div className="productOffer" key={index}>
              <div className="left">
                <h3>{product.name}</h3>
                <p>{product.desc}</p>
                <p>
                  Start Date: <span>{product.StartDate}</span>
                </p>
                <p>
                  End Date: <span>{product.endDate}</span>
                </p>
                <p>
                  Old Price: <span>{product.oldPrice}</span>
                </p>
                <p>
                  New Price: <span>{product.newPrice}</span>
                </p>
                <Button
                  className="addCartBtn"
                  endIcon={<BsCartCheckFill className="BsCartCheckFill" />}
                  variant="contained"
                  type="submit"
                  onclick={() => {
                    console.log("i am clicked");
                  }}
                >
                  Add To Cart Now!
                </Button>
              </div>
              <div className="right">
                <img src={product.img} alt="loading..." />
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );

};

export default OfferCard;
