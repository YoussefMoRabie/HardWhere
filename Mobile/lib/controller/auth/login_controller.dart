import 'package:get/get.dart';
import 'package:hardwhere/view/screen/auth/signup.dart';

abstract class LoginController extends GetxController{
  login();
  toSignUp();

}

class LoginControllerImp extends LoginController{
  @override
  login() {
    // TODO: implement login
    throw UnimplementedError();
  }

  @override
  toSignUp() {
      Get.to(const SignUp());
  }
}