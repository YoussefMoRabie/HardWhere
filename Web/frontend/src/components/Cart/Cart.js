import "./Cart.css";
import { BsFillCartDashFill } from "react-icons/bs";
import { BsFillCartPlusFill } from "react-icons/bs";
import { CiCircleRemove } from "react-icons/ci";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { BsCartCheckFill } from "react-icons/bs";

const Cart = () => {
  const [productData, setProductData] = useState([
    {
      pid: "1",
      img: "https://www.bestshop.com.py/img/1000x1000/products/13749/13749.jpg",
      product_name: "Phone 18164",
      price: "500",
      qty: "3",
      totalCnt: "5",
    },
    {
      pid: "0",

      img: "https://www.bestshop.com.py/img/1000x1000/products/13749/13749.jpg",
      product_name: "Phone 18164",
      price: "500",
      qty: "3",
      totalCnt: "5",
    },
  ]);
  const getDatatoCart = async () => {
    try {
      const data = await fetch("http://localhost:1444/api/v1/Cart");
      const data2 = await data.json();
      console.log(data2);
      setProductData(data2[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDatatoCart();
  }, []);
  // module.exports = {
  //   getDatatoCart,
  // };
  async function deleteReq(id) {
    try {
      console.log("del");
      await fetch(`http://localhost:1444/api/v1/Cart/${id}`, {
        method: "DELETE",
      });
      getDatatoCart();
    } catch (error) {
      console.log(error);
    }
  }
  let total = 0;
  return (
    <main style={{ position: "relative" }}>
      <div className="cartLayout"></div>
      <h1>My Cart</h1>

      <div className="cartContainer">
        <div className="myproducts">
          {productData.map((product, index) => {
            let totalProductPrice = 0;
            // const [count,setcount]=useState(0);
            totalProductPrice = Number(product.qty) * Number(product.price);
            total += totalProductPrice;
            return (
              <div className="productInCart">
                <img
                  src="https://www.bestshop.com.py/img/1000x1000/products/13749/13749.jpg"
                  alt=""
                />
                <div className="data">
                  <h3>{product.product_name}</h3>
                  <div className="price">
                    <span>{Number(product.qty) === 0 ? 0 : product.qty}</span> *{" "}
                    <span>{(+product.price).toFixed(2)}</span>
                    &nbsp; &nbsp; &nbsp;
                    <span style={{ color: "red" }}>
                      ${totalProductPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className={`message${product.pid}`} id='noMoreMessage'>No More</div>
                <BsFillCartDashFill
                  onClick={async () => {
                    try {
                      await fetch(
                        `http://localhost:1444/api/v1/Cart/decQty/${product.pid}`,
                        { method: "PATCH" }
                      );
                      if (product.qty === 1) {
                        deleteReq(product.pid);
                      }
                      if (product.totalCnt === 0) {
                        document.querySelector(`.message${product.pid}`).style.display =
                          "none";
                      }
                      getDatatoCart();
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  className="BsFillCartDashFill"
                ></BsFillCartDashFill>
                <BsFillCartPlusFill
                  onClick={async () => {
                    if (product.totalCnt!==0) {
                      try {
                        await fetch(
                          `http://localhost:1444/api/v1/Cart/incQty/${product.pid}`,
                          { method: "PATCH" }
                        );
                        getDatatoCart();
                        console.log("inc");
                      } catch (error) {
                        console.log(error);
                      }
                    } else {
                      document.querySelector(`.message${product.pid}`).style.display =
                        "block";
                    }
                  }}
                  className="BsFillCartPlusFill"
                ></BsFillCartPlusFill>

                <CiCircleRemove
                  onClick={() => {
                    deleteReq(product.pid);
                  }}
                  className="Xremove"
                ></CiCircleRemove>
              </div>
            );
          })}
        </div>
        <div className="summary">
          <h4>Cart Summary</h4>
          <hr />
          <span style={{ fontWeight: "900" }}>Total Price:</span>
          &nbsp;{" "}
          <span style={{ color: "salmon", fontWeight: "bolder" }}>
            ${total.toFixed(2)}
          </span>
          <div>
            <Button
              variant="contained"
              endIcon={<BsCartCheckFill style={{ color: "#87ff87" }} />}
              style={{ margin: "25px 0" }}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </main>
  );


};

export default Cart;
