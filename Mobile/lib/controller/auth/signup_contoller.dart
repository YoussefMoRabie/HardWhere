
import 'package:get/get.dart';

abstract class SignUpController extends GetxController{
  tologin();
}
class SignUpControllerImp extends SignUpController{
  @override
  tologin() {
    Get.back();
  }

}