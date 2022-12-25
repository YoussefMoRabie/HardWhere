
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:get/get.dart';

import '../../core/class/status_request.dart';
import '../../core/functions/handling_data_controller.dart';
import '../../core/shared/toast.dart';
import '../../data/data_source/remote/Auth/signup_data.dart';

abstract class SignUpController extends GetxController{
  signUp();
}
class SignUpControllerImp extends SignUpController{
  GlobalKey<FormState> formState=GlobalKey<FormState>();

  late TextEditingController fName;
  late TextEditingController lName;
  late TextEditingController email;
  late TextEditingController phone;
  late TextEditingController address;
  late TextEditingController password;

  StatusRequest statusRequest = StatusRequest.none;

   SignupData signupData = SignupData(Get.find());

   @override
  void onInit() {
    fName = TextEditingController();
    lName = TextEditingController();
    phone = TextEditingController();
    email = TextEditingController();
    address = TextEditingController();
    password = TextEditingController();
    super.onInit();
  }

  @override
  signUp() async {

    if(formState.currentState!.validate()) {
      statusRequest = StatusRequest.loading;
      update();
      var response = await signupData.postData(
          fName.text, lName.text, password.text, email.text, phone.text,
          address.text);
      print("=============================== Controller $response ");
      statusRequest = handlingData(response);
      print(response['status'].toString());

      if (StatusRequest.success == statusRequest) {
        if (response['status'] == true) {
          toast("successfully registered",Colors.green);
          Get.back();
        }
        else {
          toast("Phone Number Or Email Already Exists",Colors.red);
          statusRequest = StatusRequest.failure;
        }
      }
      update();
      }
    }




  @override
  void dispose() {
    fName.dispose();
    lName.dispose();
    email.dispose();
    phone.dispose();
    address.dispose();
    password.dispose();
    super.dispose();
  }



}