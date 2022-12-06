
import 'package:flutter/cupertino.dart';
import 'package:get/get.dart';

abstract class SignUpController extends GetxController{
  tologin();
}
class SignUpControllerImp extends SignUpController{
  GlobalKey<FormState> formState=GlobalKey<FormState>();

  @override
  tologin() {

    if(formState.currentState!.validate())
    {
      Get.back();

    }
    else{

    }
  }

}