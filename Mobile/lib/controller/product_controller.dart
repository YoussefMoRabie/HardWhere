import 'package:get/get.dart';
import 'package:hardwhere/view/screen/product.dart';

import '../core/class/status_request.dart';
import '../core/functions/handling_data_controller.dart';
import '../data/data_source/remote/product_data.dart';

abstract class ProductController extends GetxController {
  void incCount();
  void decCount();
  initialData();
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


    statusRequest = StatusRequest.loading;
    // productDetails.clear();
    var response = await productData.getData(id);
    statusRequest = handlingData(response);
    if (StatusRequest.success == statusRequest) {
      if (response['status'] == true) {
        productDetails=response['data'];
      } else {
        statusRequest = StatusRequest.failure;
      }
    }
    update();






    super.onInit();
  }

  @override
  void decCount() {
    count++;
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
    print("oooooooooooooooooooooooooooooooooooooooooooooooooooooooo$id");

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
    } else {
      statusRequest = StatusRequest.failure;
    }
  }
  update();
}
}