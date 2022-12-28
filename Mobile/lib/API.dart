class AppLink {

  static const String server = "http://10.0.2.2:1444/api/v1";
  
  static const String offers = "$server/getOffers";
  static const String signUp = "$server/signup";
  static const String login = "$server/check_GetDataUser";
  static const String addToOrders = "$server/addtoOrders?";
  static const String productData = "$server/product/";
  static const String laptops = "$server/labtops";
  static const String mobiles = "$server/mobiles";
  static const String headphones = "$server/headphones";
  static const String accessories = "$server/accessories";
  static const String screens = "$server/screens";
  static const String cart = "$server/Cart?ssn=";
  static const String cartDel = "$server/Cart/del/";
  static const String fav = "$server/getFavorite?ssn=";
  static const String delFav = "$server/removeFromFavorite?ssn=";
  static const String addFav = "$server/addToFavorite?ssn=";
  static const String addToCart = "$server//product/addtocart";
  static const String incCart = "$server/Cart/incQty/";
  static const String decCart = "$server/Cart/decQty/";

}