import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controller/test_controller.dart';
import '../core/class/status_request.dart';

class TestView extends StatelessWidget {
  const TestView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Get.put(TestController());
    return Scaffold(
      appBar: AppBar(title: Text("Title")),
      body: GetBuilder<TestController>(builder: (controller) {
        if (controller.statusRequest == StatusRequest.loading) {
          return   Center(child:Text ("Loading")  );//Lottie.asset('assets/lottie/loading.json'  ,height: 200 , width: 200),);
        } else if (controller.statusRequest == StatusRequest.offlineFailure) {
          return const Center(child: Text("Offline Failure"));
        } else if (controller.statusRequest == StatusRequest.serverFailure) {
          return const Center(child: Text("Server Failure"));
        } else {
          return ListView.builder(
              itemCount: controller.data.length,
              itemBuilder: (context, index) {
                return Text("${controller.data}");
              });
        }
      }),
    );
  }
}