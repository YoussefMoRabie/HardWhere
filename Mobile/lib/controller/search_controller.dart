
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hardwhere/core/shared/toast.dart';
import 'package:hardwhere/data/data_source/remote/search_data.dart';
import 'package:hardwhere/data/data_source/remote/search_data.dart';
import 'package:syncfusion_flutter_sliders/sliders.dart';

import '../core/class/status_request.dart';
import '../core/functions/handling_data_controller.dart';
import '../data/data_source/remote/fav_data.dart';
import '../data/data_source/remote/orders_data.dart';
import '../view/screen/product.dart';
import 'layout_controller.dart';

abstract class SearchController extends GetxController {
  getSearchData(txt);
  changeCheckBox();
  goToProduct(int selectedPro);
}

class SearchControllerImp extends SearchController {
SearchData searchData = SearchData(Get.find());
late StatusRequest statusRequest;
bool checkedValue=false;


  @override
  void onInit() {
    statusRequest = StatusRequest.loading;
    super.onInit();
  }
List Items = [];
@override
goToProduct(int selectedPro) {
  Get.to(()=> const Product() ,arguments: {
    "selectedPro": selectedPro,
  });
}


@override
getSearchData(txt) async {
  Items.clear();
  statusRequest = StatusRequest.loading;
  var response = await searchData.getData(txt);
  print("=============================== Controller $response ");
  statusRequest = handlingData(response);
  if (StatusRequest.success == statusRequest) {
    if (response['status'] == true) {
      Items.addAll(response['data']);
    } else {
      toast("Something Wrong", Colors.red);
      statusRequest = StatusRequest.failure;
    }
  }
  update();
}

@override
  changeCheckBox(){
  checkedValue=!checkedValue;
  print(checkedValue);
  update();
}

}