import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hardwhere/core/shared/toast.dart';

import '../core/class/status_request.dart';
import '../core/functions/handling_data_controller.dart';
import '../data/data_source/remote/product_data.dart';
import 'cart_controller.dart';
import 'fav_controller.dart';

abstract class ProductController extends GetxController {
  void incCount();
  void decCount();
  initialData();
  addToFav();
  addToCart();
  getData();

}

class ProductControllerImp extends ProductController {
int count=1;
late int id;
 Map<String,dynamic> productDetails ={};
ProductData productData = ProductData(Get.find());
late StatusRequest statusRequest;


  @override
  Future<void> onInit() async {
    initialData();
    await getData();
    super.onInit();
  }

  @override
  void decCount() {
    if(count<productDetails["count"]) {
      count++;
    }
    else{
      toast("We have $count pieces only", Colors.amberAccent);
    }
    update();
  }

  @override
  void incCount() {
    if(count>1) {
      count--;
    }
    update();
  }

  @override
  initialData() {

    id = Get.arguments['selectedPro'];
  }



@override
getData() async {
  statusRequest = StatusRequest.loading;
  // productDetails.clear();
  var response = await productData.getData(id);
  statusRequest = handlingData(response);
  if (StatusRequest.success == statusRequest) {
    if (response['status'] == true) {
      productDetails=response['data'];
      print("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<${productDetails["count"]}");

    } else {
      statusRequest = StatusRequest.failure;
    }
  }

  update();
}
@override
addToFav() async {
  statusRequest = StatusRequest.loading;
  var response = await productData.addToFav(id);
  statusRequest = handlingData(response);
  if (StatusRequest.success == statusRequest) {
    if (response['status'] == true) {
      toast(response['message'], Colors.green);
      FavControllerImp favController=Get.put(FavControllerImp());
      favController.getFavData();


    } else {
      toast('Already added', Colors.red);
      statusRequest = StatusRequest.failure;
    }
  }

  update();
}
@override
addToCart() async {
  statusRequest = StatusRequest.loading;
  var response = await productData.addToCart(id,count);
  print(response.toString());
  statusRequest = handlingData(response);
  print(statusRequest.toString());

  if (StatusRequest.success == statusRequest) {
    if (response['status'] == true) {
      toast(response['message'], Colors.green);
      CartControllerImp cartController=Get.put(CartControllerImp());
      cartController.getData();


    } else {
      toast('Already added', Colors.red);
      statusRequest = StatusRequest.failure;
    }
  }

  update();
}
}