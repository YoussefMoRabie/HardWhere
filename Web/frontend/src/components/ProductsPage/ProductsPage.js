import { useNavigate, useParams } from 'react-router-dom'
import '../Slider/Slider.css'
import './ProductsPage.css'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
const ProductsPage = () => {
  const { searchVal: parm}=useParams();
  const his =useNavigate();
  const products = [{
    image: "https://picsum.photos/200/300", title: "This is a title", id: 2, price: "299$", rating: 2, clickEvent: function (e) {
      his('/product/' + this.id)
    }
  },
    {
      image: "https://picsum.photos/600/500", id: 8, title: "This is a second title", price: "299$", rating: 3, clickEvent: function (e) {
        his('/product/' + this.id)
      }
    },
    {
      image: "https://picsum.photos/600/500", id: 12, title: "This is a second title", price: "299$", rating: 3, clickEvent: function (e) {
        his('/product/' + this.id)
      }
    },
    {
      image: "https://picsum.photos/600/500", id: 42, title: "This is a second title", price: "299$", rating: 3, clickEvent: function (e) {
        his('/product/' + this.id)
      }
    },
    {
      image: "https://picsum.photos/600/500", id: 52, title: "This is a second title", price: "299$", rating: 3, clickEvent: function (e) {
        his('/product/' + this.id)
      }
    },
    {
      image: "https://picsum.photos/600/500", id: 2, title: "This is a second title", price: "299$", rating: 3, clickEvent: function (e) {
        his('/product/' + this.id)
      }
    },
    {
      image: "https://picsum.photos/700/600", id: 3, title: "This is a third title", price: "299$", rating: 1, clickEvent: function (e) {
        his('/product/' + this.id)
      }
    },
    {
      image: "https://picsum.photos/500/400", id: 4, title: "This is a fourth title", price: "299$", rating: 4, clickEvent: function (e) {
        his('/product/' + this.id)
      }
    },
    {
      image: "https://picsum.photos/200/300", id: 5, title: "This is a fifth title", price: "299$", rating: 5, clickEvent: function (e) {
        his('/product/' + this.id)
      }
    },
    {
      image: "https://picsum.photos/800/700", id: 6, title: "This is a sixth title", price: "299$", rating: 3, clickEvent: function (e) {
        his('/product/' + this.id)
      }
    },
    {
      image: "https://picsum.photos/300/400", id: 7, title: "This is a seventh title", price: "299$", rating: 3, clickEvent: function (e) {
        his('/product/' + this.id)
      }
    }]
  return (
    <div className='proPage'>
      
      <h3> <span>{parm}</span></h3>
    <div className='showproducts'>
      
      {
        products.map((product,index)=>
      <div className="slider-card" key={index} onClick={(e) => product.clickEvent(e)}>
        <div className="slider-card-image" style={{ backgroundImage: `url(${product.image})`, backgroundSize: 'cover' }}></div>
        <p className="slider-card-title">{product.title}</p>
        <Rating className='slider_rating' name="half-rating-read" defaultValue={product.rating} precision={0.5} size="small" readOnly />
        <p className="slider-card-price">{product.price}</p>
      </div>)}
    </div>
    </div>
    );
}
 
export default ProductsPage;