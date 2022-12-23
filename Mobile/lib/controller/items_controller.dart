import 'package:get/get.dart';
import 'package:hardwhere/view/screen/product.dart';

import '../core/class/status_request.dart';
import '../core/functions/handling_data_controller.dart';

abstract class ItemsController extends GetxController{
  intialData();
  changeCat(int val, String catVal);
  getItems(String categoryId);
  goToProducts();

}
class ItemsControllerImp extends ItemsController{
  List categories = [];
  String? catid;
  int? selectedCat;

  //ItemsData testData = ItemsData(Get.find());

  List data = [];

  late StatusRequest statusRequest;

  @override
  void onInit() {
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
  getItems(categoryid) async {
    // data.clear();
    // statusRequest = StatusRequest.loading;
    // var response = await testData.getData(categoryid);
    // print("=============================== Controller $response ");
    // statusRequest = handlingData(response);
    // if (StatusRequest.success == statusRequest) {
    //   // Start backend
    //   if (response['status'] == "success") {
    //     data.addAll(response['data']);
    //   } else {
    //     statusRequest = StatusRequest.failure;
    //   }
    //   // End
    // }
    // update();
  }

  @override
  goToProducts() {
    Get.to(const Product());
  }
}