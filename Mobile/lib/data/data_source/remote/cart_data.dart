import 'package:hardwhere/main.dart';

import '../../../../API.dart';
import '../../../../core/class/curd.dart';

class CartData {
  Crud crud;
  CartData(this.crud);
  getData() async {
    var response = await crud.getData("${AppLink.cart}$id");
    return response.fold((l) => l, (r) => r);
  }
  deletePro(proId) async {
    var response = await crud.deletData("${AppLink.cartDel}$proId?ssn=$id");
    return response.fold((l) => l, (r) => r);
  }
}