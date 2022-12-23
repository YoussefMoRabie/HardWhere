import 'package:get/get.dart';

import '../core/services/services.dart';
import '../view/screen/items.dart';

abstract class HomeController extends GetxController {
  initialData();
  goToItems(int selectedCat);
}

class HomeControllerImp extends HomeController {
  MyServices myServices = Get.find();

  String? username;
  String? id;

  @override
  initialData() {

    username = myServices.sharedPreferences.getString("username") ;
    id = myServices.sharedPreferences.getString("id") ;
  }

  @override
  void onInit() {
    initialData();
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