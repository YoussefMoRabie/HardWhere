import React from 'react';
import './Slider.css';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
const ReactCardSlider = (props) => {
  const slideLeft = () => {
    var slider = document.getElementById("slider"+props.CategoryName);
    slider.scrollLeft = slider.scrollLeft + 500;
  }

  const slideRight = () => {
    var slider = document.getElementById("slider" + props.CategoryName);
    slider.scrollLeft = slider.scrollLeft - 500;
  }

  return (
    <div id="main-slider-container">
      <MdChevronLeft size={40} className="slider-icon left" onClick={slideLeft} />
      <div className='slider' id={'slider' + props.CategoryName} >
        {
          props.slides.map((slide, index) => {
            return (
              <div className="slider-card" key={index} onClick={(e) => slide.clickEvent(e)}>
                <div className="slider-card-image" style={{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover' }}></div>
                <p className="slider-card-title">{slide.title}</p>
                <Rating className='slider_rating' name="half-rating-read" defaultValue={slide.rating} precision={0.5} size="small" readOnly />
                <p className="slider-card-price">{slide.price}</p>
              </div>
            )
          })
        }
      </div>
      <MdChevronRight size={40} className="slider-icon right" onClick={slideRight} />
    </div>
  )
}
export default ReactCardSlider;