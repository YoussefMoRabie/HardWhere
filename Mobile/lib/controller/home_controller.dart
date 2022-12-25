import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../core/class/status_request.dart';
import '../core/functions/handling_data_controller.dart';
import '../core/services/services.dart';
import '../data/data_source/remote/home_data.dart';
import '../view/screen/items.dart';

abstract class HomeController extends GetxController {
  initialData();
  getData();
  goToItems(int selectedCat);
}

class HomeControllerImp extends HomeController {
  MyServices myServices = Get.find();

  String? fName;
  String? lName;
  String? id;

  List categoriesImages = [
    const AssetImage('assets/images/Cat_Laptop.png'),
    const AssetImage('assets/images/Cat_Phone.png'),
    const AssetImage('assets/images/Cat_headphones.png'),
    const AssetImage('assets/images/Cat_accessories.png'),
    const AssetImage('assets/images/Cat_Screen.png'),
  ];
  List categoriesName = [
    "Laptops",
    "Mobiles",
    "Headphones",
    "Accessories",
    "Screens"
  ];
  List items = [];


  HomeData homeData = HomeData(Get.find());
  late StatusRequest statusRequest;


  @override
  initialData() {

    fName = myServices.sharedPreferences.getString("fName") ;
    lName = myServices.sharedPreferences.getString("lName") ;
    id = myServices.sharedPreferences.getString("id") ;
  }

  @override
  getData() async {
    statusRequest = StatusRequest.loading;
    var response = await homeData.getOffersData();
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
  void onInit() {
    initialData();
    getData();
    super.onInit();
  }


  @override
  goToItems(selectedCat) {
    Get.to(const Items() ,arguments: {
    //"categories": categories,
    "selectedCat": selectedCat,
    //"catid": categoryid
    });
  }
}