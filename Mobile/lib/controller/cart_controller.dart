import 'package:get/get.dart';

abstract class CartController extends GetxController {
  void incCount();
  void decCount();
}

class CartControllerImp extends CartController {
 // late ItemsModel itemsModel;
int count=1;

  //
  // intialData() {
  //   //itemsModel = Get.arguments['itemsmodel'];
  // }


  // @override
  // void onInit() {
  //   intialData();
  //   super.onInit();
  // }

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