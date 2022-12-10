import 'package:get/get.dart';
import 'package:hardwhere/view/screen/auth/login.dart';
abstract class OnBoardingController extends GetxController{
 changeIndex(index);
 toLogin();
}
class OnBoardingControllerImp extends OnBoardingController{
  int currentPage=0;
  @override
  changeIndex(index) {
    currentPage=index;
    update();
  }

  @override
  toLogin() {
    Get.offAll(() => const Login());
  }

}