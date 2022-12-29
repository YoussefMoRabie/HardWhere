import 'package:hardwhere/main.dart';
import 'package:intl/intl.dart';

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
    var now = DateTime.now();
    var formatter = DateFormat('yyyy-MM-dd');
    String formattedDate = formatter.format(now);
    var response = await crud.postData(AppLink.addOrder,
        {
          "total": "$total",
          "date":formattedDate,
          "cust_ssn": "$id",
          "scid": "$scid",
          "products":orders.toString(),
        }
    );
    return response.fold((l) => l, (r) => r);
  }


}