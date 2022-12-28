import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hardwhere/core/shared/toast.dart';
import 'package:hardwhere/data/data_source/remote/checkout_data.dart';
import 'package:hardwhere/view/screen/layout.dart';

import '../core/class/status_request.dart';
import '../core/functions/handling_data_controller.dart';
import '../data/data_source/remote/product_data.dart';
import 'cart_controller.dart';
import 'fav_controller.dart';

abstract class CheckOutController extends GetxController {
  changeSC(val);
  getData();
  makeOrder();
}

class CheckOutControllerImp extends CheckOutController {

  List<Map<String,dynamic>> order = <Map<String,dynamic>>[];
  int selectedSC =0;
  int total=0;



  List items = [];
  List products=[];
  initialData() {

    products = Get.arguments['orders'];
    total = Get.arguments['total'];
    order = Get.arguments['orders_to_DB'];
    print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    print(products);
    print(order);
  }
  CheckOutData checkoutData = CheckOutData(Get.find());
  late StatusRequest statusRequest;

  @override
  void onInit()  {
    initialData();
    getData();
  super.onInit();
  }

  @override
  changeSC(val) {
    selectedSC = val;
    update();
  }


  @override
  getData() async {
    items.clear();
    statusRequest = StatusRequest.loading;
    var response = await checkoutData.getData();
    print("=============================== Controller $response ");
    statusRequest = handlingData(response);
    if (StatusRequest.success == statusRequest) {
      if (response['status'] == true) {
        items.addAll(response['data']);
      } else {
        statusRequest = StatusRequest.failure;
      }
    }
    update();
  }

  @override
  makeOrder() async {
    statusRequest = StatusRequest.loading;
    var response = await checkoutData.postOrder(total+items[selectedSC]["cost"], items[selectedSC]["scid"], order);
    print("=============================== Controller $response ");
    statusRequest = handlingData(response);
    if (StatusRequest.success == statusRequest) {
      if (response['status'] == true) {
        toast("message", Colors.green);
      } else {
        statusRequest = StatusRequest.failure;
      }
    }
    CartControllerImp cartController=Get.put(CartControllerImp());
    cartController.getData();
    update();
    Get.back();

  }


}