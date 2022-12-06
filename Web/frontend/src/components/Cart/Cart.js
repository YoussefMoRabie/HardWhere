import "./Cart.css";
import { BsFillCartDashFill } from "react-icons/bs";
import { BsFillCartPlusFill } from "react-icons/bs";
import { CiCircleRemove } from "react-icons/ci";

let productData;

const getData = async () => {
  try {
    const data = await fetch("/api/v1/Cart");
    productData = await data.json();
  } catch (error) {
    console.log(error);
  }
  console.log(productData);
};
getData();

// const productData = [
//   {
//     img: "https://www.bestshop.com.py/img/1000x1000/products/13749/13749.jpg",
//     name: "Phone 18164",
//     Price: "500",
//     count: "3",
//   },
//   {
//     img: "https://www.bestshop.com.py/img/1000x1000/products/13749/13749.jpg",
//     name: "Phone 18164",
//     Price: "500",
//     count: "3",
//   },
//   {
//     img: "https://www.bestshop.com.py/img/1000x1000/products/13749/13749.jpg",
//     name: "Phone 18164",
//     Price: "500",
//     count: "3",
//   },
//   {
//     img: "https://www.bestshop.com.py/img/1000x1000/products/13749/13749.jpg",
//     name: "Phone 18164",
//     Price: "500",
//     count: "3",
//   },
//   {
//     img: "https://www.bestshop.com.py/img/1000x1000/products/13749/13749.jpg",
//     name: "Phone 18164",
//     Price: "500",
//     count: "3",
//   },
//   {
//     img: "https://www.bestshop.com.py/img/1000x1000/products/13749/13749.jpg",
//     name: "Phone 18164",
//     Price: "500",
//     count: "3",
//   },
// ];
const Cart = () => {
  return (
    <main style={{ position: "relative" }}>
      <div className="cartLayout"></div>
      <h1>My Cart</h1>

      <div className="cartContainer">
        <div className="myproducts">
          {productData.map((product, index) => {
            let totalProductPrice = 0;
            totalProductPrice = Number(product.count) * Number(product.Price);
            return (
              <div className="productInCart">
                <img
                  src="https://www.bestshop.com.py/img/1000x1000/products/13749/13749.jpg"
                  alt=""
                />
                <div className="data">
                  <h3>{product.name}</h3>
                  <div className="price">
                    <span>{product.count}</span> *{" "}
                    <span>{(+product.Price).toFixed(2)}</span>
                    &nbsp; &nbsp; &nbsp;
                    <span style={{ color: "red" }}>
                      ${totalProductPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                <BsFillCartDashFill className="BsFillCartDashFill"></BsFillCartDashFill>
                <BsFillCartPlusFill className="BsFillCartPlusFill"></BsFillCartPlusFill>
                <CiCircleRemove className="Xremove"></CiCircleRemove>
              </div>
            );
          })}
        </div>
        <div className="summary">
          <h4>Cart Summary</h4>
          <hr />
          <span style={{ fontWeight: "900" }}>Total Price:</span> &nbsp;
          &nbsp;&nbsp;{" "}
          <span style={{ color: "salmon", fontWeight: "bolder" }}>
            $9000.00
          </span>
        </div>
      </div>
    </main>
  );
};

export default Cart;
