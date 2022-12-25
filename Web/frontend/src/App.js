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
          <Route path="/addemployee" element={<AddAdmin />}></Route>
          <Route path="/addsupplier" element={<AddSupplier />}></Route>
          <Route path="/addshipping" element={<AddShipping/>}></Route>
          <Route path="/addstorage" element={<AddStorage/>}></Route>
          <Route path="/updatesupplier" element={<UpdateSupplier/>}></Route>
          <Route path="/updatestorage" element={<UpdateStorage/>}></Route>
          <Route path="/updateshipping" element={<UpdateShipping/>}></Route>
          <Route path="/updateemployee" element={<UpdateEmployee/>}></Route>
          <Route path="/deleteemployee" element={<DeleteEmployee/>}></Route>
          <Route path="/deletesupplier" element={<DeleteSupplier/>}></Route>
          <Route path="/deletecompany" element={<DeleteCompany/>}></Route>
          <Route path="/deletestorage" element={<DeleteStorage/>}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
