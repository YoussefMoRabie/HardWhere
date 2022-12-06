import 'package:get/get.dart';

import '../core/class/curd.dart';

class InitialBindings extends Bindings{
  @override
  void dependencies() {
      Get.put(Crud());
  }

}