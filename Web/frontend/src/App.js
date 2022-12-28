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
import AddSupplier from "./components/Manager/AddSupplier";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import SearchResults from './components/search/search'
import AddAdmin from './components/Manager/AddAdmin'
import AddShipping from "./components/Manager/AddShipping";
import AddStorage from "./components/Manager/AddStorages";
import UpdateSupplier from "./components/Manager/UpdateSupp";
import UpdateStorage from "./components/Manager/UpdateStorage";
import UpdateShipping from "./components/Manager/UpdateShipping";
import UpdateEmployee from "./components/Manager/UpdateEmployee";
import DeleteEmployee from "./components/Manager/DltEmployee";
import DeleteSupplier from "./components/Manager/DltSupp";
import DeleteStorage from "./components/Manager/DltStorage";
import DeleteCompany from "./components/Manager/DltShipping";
import AdminPanel from "./components/EmployeeNav/AdminPanel";
import React from "react";
import WishList from "./components/WishlistPage/WishList";
import UpdateCustomer from './components/userPage/UpdateCustomer'
function App() {
  const[auth,setAuth]=React.useState('');
  return (
    <div className="App">
      <Router path="/">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="/Cart" element={<Cart />}></Route>
          <Route path="/Signin" element={<Login setAuth={setAuth} />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/:categoryVal" element={<ShowProducts />}></Route>
          <Route path="search/:searchVal" element={<SearchResults />}></Route>
          <Route path="/adminPanel" element={<AdminPanel />}></Route>
          <Route path="/wishlist" element={<WishList />}></Route>
          <Route path="/updatecustomer" element={<UpdateCustomer />}></Route>
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
