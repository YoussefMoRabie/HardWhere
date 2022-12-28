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
    var response = await crud.deleteData("${AppLink.cartDel}$proId?ssn=$id");
    return response.fold((l) => l, (r) => r);
  }
  incPro(proId) async {
    var response = await crud.patchData("${AppLink.incCart}$proId?ssn=$id",{});
    return response.fold((l) => l, (r) => r);
  }
  decPro(proId) async {
    var response = await crud.patchData("${AppLink.decCart}$proId?ssn=$id",{});
    return response.fold((l) => l, (r) => r);
  }
}