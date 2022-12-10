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
} = require("../controller/Controllers");



// we will add our needed routes here like this
//&
// get our functions from PostControllers 
router.route("/Cart").get(getCartProducts);
router.route("/Cart/:id").delete(deleteProductFromCart);
router.route("/Cart/decQty/:id").patch(decProductQtyinCart);  
router.route("/Cart/incQty/:id").patch(incProductQtyinCart);  
router.route('/product/:id').get(getProductData);
router.route("/product/addtocart").post(addToCart);
router.route('/getOffers').get(getOffersData);
module.exports=router;
