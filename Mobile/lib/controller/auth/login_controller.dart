import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hardwhere/view/screen/auth/signup.dart';
import 'package:hardwhere/view/screen/home.dart';
import 'package:hardwhere/view/screen/layout.dart';

import '../../core/class/status_request.dart';
import '../../core/functions/handling_data_controller.dart';
import '../../core/services/services.dart';
import '../../core/shared/toast.dart';
import '../../data/data_source/remote/Auth/login_data.dart';

abstract class LoginController extends GetxController{
  login();
  toSignUp();

}

class LoginControllerImp extends LoginController{
  GlobalKey<FormState> formState=GlobalKey<FormState>();
  bool isShowPass=true;
  IconData icon=Icons.visibility;


  late TextEditingController email;
  late TextEditingController password;

  LoginData loginData = LoginData(Get.find());


  MyServices myServices = Get.find();

  StatusRequest statusRequest = StatusRequest.none;

  void togglePassObscure(){
    isShowPass=!isShowPass;
    icon=isShowPass?Icons.visibility:Icons.visibility_off;
    update();
  }
  @override
  login() async {


    if (formState.currentState!.validate()) {
          statusRequest = StatusRequest.loading;
          update();
          var response = await loginData.getData(email.text, password.text);
          print("=============================== Controller $response ");
          statusRequest = handlingData(response);
          if (StatusRequest.success == statusRequest) {
            if (response['status'] == true) {
              myServices.sharedPreferences.setString("id", response['data']['ssn'].toString()) ;
              myServices.sharedPreferences.setString("fName", response['data']['f_name']) ;
              myServices.sharedPreferences.setString("lName", response['data']['l_name']) ;
              myServices.sharedPreferences.setString("email", email.text) ;
              myServices.sharedPreferences.setString("password", password.text) ;
              myServices.sharedPreferences.setString("phone", response['data']['phone'].toString()) ;
              myServices.sharedPreferences.setString("address", response['data']['address']) ;
              toast("Welcome,${response['data']['f_name']}",Colors.green);
              Get.offAll(const Layout());
            } else {
              toast("Email Or Password Not Correct",Colors.red);
              statusRequest = StatusRequest.failure;
            }
          }
          update();
        } else {}
  }

  @override
  toSignUp() {
    Get.delete<LoginControllerImp>();
    Get.to(const SignUp());
  }



  @override
  void onInit() {
    // FirebaseMessaging.instance.getToken().then((value) {
    //   print(value);
    //   String? token = value;
    // });
    email = TextEditingController();
    password = TextEditingController();
    super.onInit();
  }

  @override
  void dispose() {
    email.dispose();
    password.dispose();
    super.dispose();
  }

  // @override
  // goToForgetPassword() {
  //   Get.toNamed(AppRoute.forgetPassword);
  // }
 }