import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hardwhere/core/shared/toast.dart';

import '../core/class/status_request.dart';
import '../core/functions/handling_data_controller.dart';
import '../data/data_source/remote/cart_data.dart';

abstract class CartController extends GetxController {
  void incCount(proId,index);
  void decCount(proId,index);
  deleteItem(int proId) ;
  getData();
  getOrder();
  num? getTotal();
}

class CartControllerImp extends CartController {
CartData cartData = CartData(Get.find());
late StatusRequest statusRequest;


  @override
  void onInit() {
    //intialData();
    getData();
    super.onInit();
  }
List items = [];
  List<Map<String,dynamic>> order = <Map<String,dynamic>>[];

num? count=0;


@override
getData() async {
  items.clear();
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
  void   incCount(proId,index) async {
  if(items[index]["totalCnt"]>items[index]["qty"]) {
    statusRequest = StatusRequest.loading;
    var response = await cartData.incPro(proId);
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
  }
  else{
    toast("We have ${items[index]["totalCnt"]} pieces only", Colors.amberAccent);
  }
    update();
  }

  @override
  void decCount(proId,index) async {
    if(items[index]["qty"]>1) {
      statusRequest = StatusRequest.loading;
    var response = await cartData.decPro(proId);
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
    }
    else{
      toast("Delete the product if you do not want it", Colors.amberAccent);
    }

    update();
  }

  @override
  num? getTotal() {
 count=0;
    for(var i = 0; i < items.length; i++) {
      if (items[i]["has_offer"] != null && items[i]["has_offer"]["data"][0] == 1){
        count = count! + items[i]["new_price"]! * items[i]["qty"]!;

      }else{
        count = count! + items[i]["price"]! * items[i]["qty"]!;
      }
    }
    return count;
  }
  @override
  getOrder(){
  order.clear();
    for(var i = 0; i < items.length; i++) {
      order.add({
        "qty":items[i]["qty"],
        "pid":items[i]["pid"],
      });
    }
    print(order);
}
}