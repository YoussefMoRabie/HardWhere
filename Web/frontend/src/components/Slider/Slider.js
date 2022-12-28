import React from "react";
import "./Slider.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
const ReactCardSlider = (props) => {
  const { state } = useLocation();
  const [favs, setFavs] = React.useState([]);
  console.log("user", state);

  useEffect(() => {
    if (state != null) {
      const getFavs = async () => {
        try {
          const dataRes = await fetch(
            `http://localhost:1444/api/v1/getFavorite?ssn=${state.ssn}`
          );
          const { data } = await dataRes.json();
          console.log("products", data);
          setFavs(data);
        } catch (error) {
          console.log(error);
        }
      };
      getFavs();
    }
  }, [state]);
  const his = useNavigate();
  const slideLeft = () => {
    var slider = document.getElementById("slider" + props.CategoryName);
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  console.log(props.slides);
  const slideRight = () => {
    var slider = document.getElementById("slider" + props.CategoryName);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const handleFavouriteClick = (e) => {
    e.target.style.color = "#faaf00";
  };

  return (
    <div id="main-slider-container">
      <MdChevronLeft
        size={40}
        className="slider-icon left"
        onClick={slideLeft}
      />
      <div className="slider" id={"slider" + props.CategoryName}>
        {props.slides.map((slide, index) => {
          return (
            <div className="slider-card" key={index}>
              <div
                className="slider-card-image"
                onClick={(e) => his(`product/${slide.pid}`, { state: state })}
                style={{
                  backgroundImage: `url(${slide.img_link})`,
                  backgroundSize: "cover",
                }}
              ></div>
              <p
                onClick={(e) => his(`product/${slide.pid}`, { state: state })}
                className="slider-card-title"
              >
                {slide.product_name}
              </p>
              <Rating
                onClick={(e) => his(`product/${slide.pid}`, { state: state })}
                className="slider_rating"
                name="half-rating-read"
                defaultValue={slide.p_value}
                precision={0.5}
                size="small"
                readOnly
              />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {state != null &&
                  !favs.find((elem) => elem.pid === slide.pid) && (
                    <FavoriteIcon
                      color="disabled"
                      onClick={handleFavouriteClick}
                    />
                  )}
                {state != null &&
                  favs.find((elem) => elem.pid === slide.pid) && (
                    <FavoriteIcon
                      sx={{ color: "#faaf00" }}
                      onClick={handleFavouriteClick}
                    />
                  )}
                <p className="slider-card-price">{slide.price}$</p>
                {/* <p className="slider-card-price">
                  {slide.has_offer.data[0] === 1
                    ? slide.new_price
                    : slide.price}
                  $
                </p> */}
              </div>
            </div>
          );
        })}
      </div>
      <MdChevronRight
        size={40}
        className="slider-icon right"
        onClick={slideRight}
      />
    </div>
  );
};
export default ReactCardSlider;
