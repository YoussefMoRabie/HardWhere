import 'package:hardwhere/main.dart';

import '../../../../API.dart';
import '../../../../core/class/curd.dart';

class CheckOutData {
  Crud crud;
  CheckOutData(this.crud);
  getData() async {
    var response = await crud.getData(AppLink.scData);
    return response.fold((l) => l, (r) => r);
  }
  postOrder(total,scid,orders) async {
    var response = await crud.postData(AppLink.addOrder,
        {
          "total": "$total",
          "date":"2020-11-12",
          "cust_ssn": "$id",
          "scid": "$scid",
          "products":orders.toString(),
        }
    );
    return response.fold((l) => l, (r) => r);
  }


}