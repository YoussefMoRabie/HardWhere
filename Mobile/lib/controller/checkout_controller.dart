import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hardwhere/core/shared/toast.dart';

import '../core/class/status_request.dart';
import '../core/functions/handling_data_controller.dart';
import '../data/data_source/remote/product_data.dart';
import 'cart_controller.dart';
import 'fav_controller.dart';

abstract class CheckOutController extends GetxController {


}

class CheckOutControllerImp extends CheckOutController {



  @override
  Future<void> onInit() async {
    //initialData();
    super.onInit();
  }


}