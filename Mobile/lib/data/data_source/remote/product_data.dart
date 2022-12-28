import 'package:hardwhere/main.dart';

import '../../../../API.dart';
import '../../../../core/class/curd.dart';

class ProductData {
  Crud crud;
  ProductData(this.crud);
  getData(int id) async {
    var response = await crud.getData("${AppLink.productData}$id");
    return response.fold((l) => l, (r) => r);
  }
  addToFav(proId) async {
    var response = await crud.getData("${AppLink.addFav}$id&pid=$proId");
    return response.fold((l) => l, (r) => r);
  }

  addToCart(proId,qty) async {
    var response = await crud.postData(AppLink.addToCart, {
      "cust_ssn":"$id",
      "pid":"$proId",
      "qty":"$qty"
    }
    );
    return response.fold((l) => l, (r) => r);
  }

}