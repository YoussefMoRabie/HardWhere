// import "./";
import "./components/Navbar/Navbar";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import Product from "./components/Product/Product";
import HomePage from "./components/Home/HomePage";
import Signup from "./components/log/Signup";
import Login from "./components/log/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/product/:id" element={<Product/>}></Route>
          <Route path="/Cart" element={<Cart/>}></Route>
          <Route path="/Signin" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
