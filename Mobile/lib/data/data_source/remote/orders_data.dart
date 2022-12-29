import 'package:hardwhere/main.dart';

import '../../../../API.dart';
import '../../../../core/class/curd.dart';

class OrdersData {
  Crud crud;
  OrdersData(this.crud);
  getData() async {
    var response = await crud.getData("${AppLink.getOrders}$id");
    return response.fold((l) => l, (r) => r);
  }
}