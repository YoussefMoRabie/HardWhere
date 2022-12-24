// import "./";
import "./components/Navbar/Navbar";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import Product from "./components/Product/Product";
import ShowProducts from './components/ProductsPage/ProductsPage'
import HomePage from "./components/Home/HomePage";
import Signup from "./components/log/Signup";
import AddProduct from "./components/Admin/AddProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import Login from "./components/log/Login";
import Delete from "./components/Admin/DeleteProduct";
import Search from './components/search/search'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <div className="App">
      <Router path="/">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="/Cart" element={<Cart />}></Route>
          <Route path="/Signin" element={<Login />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/addproduct" element={<AddProduct />}></Route>
          <Route path="/updateproduct" element={<UpdateProduct />}></Route>
          <Route path="/deleteproduct" element={<Delete />}></Route>
          <Route path="/search/:searchVal" element={<ShowProducts />}></Route>

        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
