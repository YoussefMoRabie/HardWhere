import OffersSlider from './OffersSlider/OffersSlider'
import { useLocation, useSearchParams } from "react-router-dom";

const HomePage = () => {
    // const  {state}  = useLocation();
    // console.log(state);
    // const [searchParams] = useSearchParams();
    // const ssn = searchParams.get("ssn");
    // console.log(ssn);
  return (
    <>
      <OffersSlider />
    </>
  );
};

export default HomePage;
