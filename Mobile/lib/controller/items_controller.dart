import 'package:get/get.dart';
import 'package:hardwhere/data/data_source/remote/cat_data.dart';
import 'package:hardwhere/view/screen/product.dart';

import '../core/class/status_request.dart';
import '../core/functions/handling_data_controller.dart';

abstract class ItemsController extends GetxController{
  intialData();
  changeCat(int val, String catVal);
  getLaptops();
  getScreens();
  getMobiles();
  getAccessories();
  getHeadphones();
  goToProducts();

}
class ItemsControllerImp extends ItemsController{
  List categories = [];
  String? catid;
  int? selectedCat;

  CatData catData = CatData(Get.find());

  List laptops = [];
  List screens = [];
  List headphones = [];
  List mobiles = [];
  List accessories = [];
  List lists = [];
  List length= [];


  List categoriesName = [
    "Laptops",
    "Mobiles",
    "Headphones",
    "Accessories",
    "Screens"
  ];

  late StatusRequest statusRequest;

  @override
  void onInit() {
    getLaptops();
    getMobiles();
    getHeadphones();
    getAccessories();
    getScreens();

    intialData();
    super.onInit();
  }

  @override
  intialData() {
    // categories = Get.arguments['categories'];
    selectedCat = Get.arguments['selectedCat'];
    // catid = Get.arguments['catid'];
    // getItems(catid!);
  }

  @override
  changeCat(val,catval) {
     selectedCat = val;
    // catid = catval;
    // getItems(catid!);
     update();
  }

  @override
  getLaptops() async {
    laptops.clear();
    statusRequest = StatusRequest.loading;
    var response = await catData.getLaptopsData();
    print("=============================== Controller $response ");
    statusRequest = handlingData(response);
    if (StatusRequest.success == statusRequest) {
      // Start backend
      if (response['status'] == true) {
        laptops.addAll(response['data']);
      } else {
        statusRequest = StatusRequest.failure;
      }
      // End
    }
    lists.add(laptops);
    length.add(laptops.length);
    update();
  }



  @override
  getAccessories() async {
    accessories.clear();
    statusRequest = StatusRequest.loading;
    var response = await catData.getAccessoriesData();
    print("=============================== Controller $response ");
    statusRequest = handlingData(response);
    if (StatusRequest.success == statusRequest) {
      // Start backend
      if (response['status'] == true) {
        accessories.addAll(response['data']);
      } else {
        statusRequest = StatusRequest.failure;
      }
      // End
    }
    lists.add(accessories);
    length.add(accessories.length);

    update();
  }

  @override
  getHeadphones() async {
    headphones.clear();
    statusRequest = StatusRequest.loading;
    var response = await catData.getHeadphonesData();
    print("=============================== Controller $response ");
    statusRequest = handlingData(response);
    if (StatusRequest.success == statusRequest) {
      // Start backend
      if (response['status'] == true) {
        headphones.addAll(response['data']);
      } else {
        statusRequest = StatusRequest.failure;
      }
      // End
    }
    lists.add(headphones);
    length.add(headphones.length);

    update();
  }

  @override
  getMobiles() async {
    mobiles.clear();
    statusRequest = StatusRequest.loading;
    var response = await catData.getMobilesData();
    print("=============================== Controller $response ");
    statusRequest = handlingData(response);
    if (StatusRequest.success == statusRequest) {
      // Start backend
      if (response['status'] == true) {
        mobiles.addAll(response['data']);
      } else {
        statusRequest = StatusRequest.failure;
      }
      // End
    }
    lists.add(mobiles);
    length.add(mobiles.length);
    update();
  }

  @override
  getScreens() async {
    screens.clear();
    statusRequest = StatusRequest.loading;
    var response = await catData.getScreensData();
    print("=============================== Controller $response ");
    statusRequest = handlingData(response);
    if (StatusRequest.success == statusRequest) {
      // Start backend
      if (response['status'] == true) {
        screens.addAll(response['data']);
      } else {
        statusRequest = StatusRequest.failure;
      }
      // End
    }
    lists.add(screens);
    length.add(screens.length);

    update();
  }

  @override
  goToProducts() {
    Get.to(const Product());
  }
}