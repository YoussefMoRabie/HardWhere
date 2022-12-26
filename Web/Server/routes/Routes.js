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
  check_GetDataUser,
  addOrder,
  getShippingCompData,
  getlabtops,
  getmobiles,
  getheadphones,
  getscreens,
  getaccessories,
  getAllProducts,
  getAllStorages,
  getAllSuppliers,
  addProduct,
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
router.route("/check_GetDataUser").get(check_GetDataUser);
router.route('/addtoOrders').post(addOrder);
router.route('/shippingCompany_Data').get(getShippingCompData);
router.route("/labtops").get(getlabtops);
router.route("/mobiles").get(getmobiles);
router.route("/headphones").get(getheadphones);
router.route("/screens").get(getscreens);
router.route("/accessories").get(getaccessories);
//admin
router.route("/getAllProducts").get(getAllProducts);
router.route("/getAllStorages").get(getAllStorages);
router.route("/getAllSuppliers").get(getAllSuppliers);
router.route("/addProduct").post(addProduct);

module.exports=router;
