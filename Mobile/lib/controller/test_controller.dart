import 'package:get/get.dart';

import '../core/class/status_request.dart';
import '../core/functions/handling_data_controller.dart';
import '../data/data_source/remote/test_data.dart';

class TestController extends GetxController {

  TestData testData = TestData(Get.find());

  List data = [];

  late StatusRequest statusRequest;

  getData() async {

    statusRequest = StatusRequest.loading;

    var response = await testData.getData();

    print("=============================== Controller $response ");

    statusRequest = handlingData(response);

    if (StatusRequest.success == statusRequest){

      // Start backend
      if (response['status'] == "success") {

        data.addAll(response['data']);


      }else{

        statusRequest = StatusRequest.failure ;

      }
      // End
    }
    update();
  }

  @override
  void onInit() {
    getData();
    super.onInit();
  }
}