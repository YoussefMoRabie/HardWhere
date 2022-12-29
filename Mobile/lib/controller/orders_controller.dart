
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hardwhere/core/shared/toast.dart';

import '../core/class/status_request.dart';
import '../core/functions/handling_data_controller.dart';
import '../data/data_source/remote/fav_data.dart';
import '../data/data_source/remote/orders_data.dart';

abstract class OrdersController extends GetxController {
  getOrdersData();
}

class OrdersControllerImp extends OrdersController {
OrdersData ordersData = OrdersData(Get.find());
late StatusRequest statusRequest;



  @override
  void onInit() {
    statusRequest = StatusRequest.loading;
    getOrdersData();
    super.onInit();
  }
List Items = [];
List len = [];



@override
getOrdersData() async {
  Items.clear();
  statusRequest = StatusRequest.loading;
  var response = await ordersData.getData();
  print("=============================== Controller $response ");
  statusRequest = handlingData(response);
  if (StatusRequest.success == statusRequest) {
    if (response['status'] == true) {
      Items.addAll(response['data']);
    } else {
      statusRequest = StatusRequest.failure;
    }
  }
  func();
  update();
}
func(){
  len.clear();
  for(var i = 0; i < Items.length; i++) {
    len.add(Items[i]["products"].length);}
  update();

  }

}