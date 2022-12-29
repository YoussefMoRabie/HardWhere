import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hardwhere/core/shared/toast.dart';
import 'package:hardwhere/view/screen/auth/login.dart';
import 'package:hardwhere/view/screen/setting.dart';
import 'package:hardwhere/view/screen/setting.dart';

import '../core/class/status_request.dart';
import '../core/functions/handling_data_controller.dart';
import '../core/services/services.dart';
import '../data/data_source/remote/cart_data.dart';
import '../data/data_source/remote/setting_data.dart';
import '../view/screen/checkout.dart';

abstract class SettingController extends GetxController {
  void update_Data();
  void logOut();
}

class SettingControllerImp extends SettingController {
SettingData settingData = SettingData(Get.find());
MyServices myServices = Get.find();
GlobalKey<FormState> formState=GlobalKey<FormState>();


late StatusRequest statusRequest;
var addressController=TextEditingController();
var emailController=TextEditingController();
var phoneController=TextEditingController();
var passwordController=TextEditingController();

  void onInit() {
    super.onInit();
    addressController.text=myServices.sharedPreferences.getString("address")!;
    emailController.text=myServices.sharedPreferences.getString("email")!;
    phoneController.text=myServices.sharedPreferences.getString("phone")!;
    passwordController.text=myServices.sharedPreferences.getString("password")!;
  }


  @override
  void update_Data() async {
    if (formState.currentState!.validate()) {
      statusRequest = StatusRequest.loading;
      var response = await settingData.updateData(
          passwordController.text, emailController.text, phoneController.text,
          addressController.text);
      print("=============================== Controller $response ");
      statusRequest = handlingData(response);
      if (StatusRequest.success == statusRequest) {
        if (response['status'] == true) {
          toast(response['message'], Colors.green);
          myServices.sharedPreferences.setString("email", emailController.text) ;
          myServices.sharedPreferences.setString("password", passwordController.text) ;
          myServices.sharedPreferences.setString("phone", phoneController.text) ;
          myServices.sharedPreferences.setString("address", addressController.text) ;

        } else {
          statusRequest = StatusRequest.failure;
        }
      }
    }
    update();
  }

  @override
  void logOut() {
    myServices.sharedPreferences.setString("id", "-1") ;

    Get.offAll(const Login());
  }


}