import OffersSlider from "./OffersSlider/OffersSlider";
import { useLocation, useSearchParams } from "react-router-dom";
import CategorySlider from "./CategorySlider/CategorySlider";
import "./HomePage.css";

import { useState } from "react";

const categories = [
  {
    name: "labtops",
  },
  {
    name: "mobiles",
  },
  {
    name: "headphones",
  },
  {
    name: "screens",
  },
  {
    name: "accessories",
  },
];
const HomePage = () => {
  return (
    <div className="Homesliders">
      <OffersSlider />
      <CategorySlider category={categories[0]} />
      <CategorySlider category={categories[1]} />
      <CategorySlider category={categories[2]} />
      <CategorySlider category={categories[3]} />
      <CategorySlider category={categories[4]} />
    </div>
  );
};

export default HomePage;
