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
  const [addfav, setaddtofav] = React.useState(null);
  const [Favs, setFavs] = React.useState([]);
  const [isFavs, setisFav] = React.useState(false);
  console.log("user", state);

  useEffect(() => {
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
  }, [])


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
  const checkFav = (product) => Favs.find((elem) => elem.pid == product.pid) ? true : false;

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
                  !Favs.find((elem) => elem.pid === slide.pid) && (
                    <FavoriteIcon
                      color="disabled"
                      data-pid={slide.pid}
                      onClick={handleFavouriteClick}
                    />
                  )}
                {state != null &&
                  Favs.find((elem) => elem.pid === slide.pid) && (
                    <FavoriteIcon
                      sx={{ color: "#faaf00" }}
                    data-pid={slide.pid}
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
