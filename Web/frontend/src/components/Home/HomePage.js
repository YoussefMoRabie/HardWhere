import OffersSlider from './OffersSlider/OffersSlider'
import { useLocation, useSearchParams } from "react-router-dom"
import CategorySlider from './CategorySlider/CategorySlider';
import './HomePage.css'
const labtopCategory={
  name:"labtop",
products:null,
}
const MobileCategory={
  name:"Mobile",
products:null,
}
const HeadphonesCategory={
  name:"Headphones",
products:null,
}
const ScreensCategory={
  name:"Screens",
products:null,
}
const AccessoriesCategory={
  name:"Accessories",
products:null,
}
const HomePage = () => {
  // const  {state}  = useLocation();
  // console.log(state);
  // const [searchParams] = useSearchParams();
  // const ssn = searchParams.get("ssn");
  // console.log(ssn);

  return (
    <div className='Homesliders'>
      <OffersSlider />
      <CategorySlider category={labtopCategory} />
      <CategorySlider category={MobileCategory} />
      <CategorySlider category={HeadphonesCategory} />
      <CategorySlider category={ScreensCategory} />
      <CategorySlider category={AccessoriesCategory} />
    
      </div>
      );
};

      export default HomePage;
