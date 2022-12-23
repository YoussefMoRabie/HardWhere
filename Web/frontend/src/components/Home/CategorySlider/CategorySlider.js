import ReactCardSlider from 'react-card-slider-component'
import sliderClick from 'react-card-slider-component'
import Slider from "../../Slider/Slider"
import { useNavigate } from 'react-router-dom'
import './CategorySlider.css'

const CategorySlider = (probs) => {
  const his = useNavigate();
  const slides = [
    {
      image: "https://picsum.photos/200/300", title: "This is a title", id: 2, price: "299$", rating: 2, clickEvent:function (e)  {
        his('./product/'+ this.id)
      }
    },
    { image: "https://picsum.photos/600/500", id: 2, title: "This is a second title", price: "299$", rating: 3,clickEvent:function (e)  {
        his('./product/'+ this.id)} },
    { image: "https://picsum.photos/700/600", id: 3 ,title: "This is a third title", price: "299$", rating: 1,clickEvent:function (e)  {
        his('./product/'+ this.id)} },
    { image: "https://picsum.photos/500/400", id: 4,title: "This is a fourth title", price: "299$", rating: 4,clickEvent:function (e)  {
        his('./product/'+ this.id)} },
    { image: "https://picsum.photos/200/300", id: 5,title: "This is a fifth title", price: "299$", rating: 5 ,clickEvent:function (e)  {
        his('./product/'+ this.id)}},
    { image: "https://picsum.photos/800/700", id: 6,title: "This is a sixth title", price: "299$", rating: 3 ,clickEvent:function (e)  {
        his('./product/'+ this.id)}},
    { image: "https://picsum.photos/300/400", id: 7,title: "This is a seventh title", price: "299$", rating: 3,clickEvent:function (e)  {
        his('./product/'+ this.id)} }
  ]

  return ( 
    <div className='CategoryMain'>
      <h2 className='CategoryName'> <span>{probs.category.name}</span></h2>
      <Slider slides={slides} CategoryName={probs.category.name} />
    </div>
   );
} 
export default CategorySlider;