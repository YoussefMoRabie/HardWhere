const express= require('express');
const router =express.Router();
const {
  getCartProducts,
  decProductQtyinCart,
  incProductQtyinCart,
  deleteProductFromCart,
  getProductData,
  addToCart,
  getOffersData,
  addCustomer,
  checkOnUser,
  getUserData,
  addOrder,
  getShippingCompData,
} = require("../controller/Controllers");



// we will add our needed routes here like this
//&
// get our functions from PostControllers 
router.route("/Cart").get(getCartProducts);
router.route("/Cart/del/:id").delete(deleteProductFromCart);
router.route("/Cart/decQty/:id").patch(decProductQtyinCart);  
router.route("/Cart/incQty/:id").patch(incProductQtyinCart);  
router.route('/product/:id').get(getProductData);
router.route("/product/addtocart").post(addToCart);
router.route('/getOffers').get(getOffersData);
router.route("/signup").post(addCustomer);
router.route("/checkOnUser").get(checkOnUser);
router.route("/getUserData").get(getUserData);
router.route('/addtoOrders').post(addOrder);
router.route('/shippingCompany_Data').get(getShippingCompData);
module.exports=router;
