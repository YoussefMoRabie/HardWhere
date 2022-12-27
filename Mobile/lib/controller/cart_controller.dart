import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hardwhere/core/shared/toast.dart';

import '../core/class/status_request.dart';
import '../core/functions/handling_data_controller.dart';
import '../data/data_source/remote/cart_data.dart';

abstract class CartController extends GetxController {
  void incCount();
  void decCount();
  deleteItem(int proId) ;
  getData();
}

class CartControllerImp extends CartController {
int count=1;
CartData cartData = CartData(Get.find());
late StatusRequest statusRequest;

  //
  // intialData() {
  //   //itemsModel = Get.arguments['itemsmodel'];
  // }


  @override
  void onInit() {
    //intialData();
    getData();
    super.onInit();
  }
List items = [];



@override
getData() async {
  statusRequest = StatusRequest.loading;
  var response = await cartData.getData();
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
deleteItem(proId) async {
  statusRequest = StatusRequest.loading;
  var response = await cartData.deletePro(proId);
  print("=============================== Controller $response ");
  statusRequest = handlingData(response);
  if (StatusRequest.success == statusRequest) {
    if (response['status'] == true) {
      toast(response['message'], Colors.green);
    } else {
      statusRequest = StatusRequest.failure;
    }
  }

  items.clear();
  await getData();

  update();
}

  @override
  void   incCount() {
    count++;
    print(count);

    update();
  }

  @override
  void decCount() {
    if(count>1) {
      count--;
    }
    print(count);
    update();
  }
}