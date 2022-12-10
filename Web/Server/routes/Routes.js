const express= require('express');
const router =express.Router();
const {
  getCartProducts,
  test,
  decProductCount,
  incProductCount,
  deleteProductFromCart,
} = require("../controller/Controllers");



// we will add our needed routes here like this
//&
// get our functions from PostControllers 
router.route("/Cart").get(getCartProducts);
router.route("/Cart/:id").delete(deleteProductFromCart);
router.route("/Cart/decCnt/:id").patch(decProductCount);  
router.route('/Cart/incCnt/:id').patch(incProductCount);  
router.route('/').get(test);

module.exports=router;
