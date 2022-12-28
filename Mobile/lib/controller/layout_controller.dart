import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hardwhere/view/screen/fav.dart';
import 'package:hardwhere/view/screen/home.dart';

import '../view/screen/cart.dart';
import '../view/screen/search.dart';
import '../view/screen/setting.dart';

abstract class LayoutController extends GetxController{
 changePage(int currentPage);
}
class LayoutControllerImp extends LayoutController{
  int currentIndex=0;

  List<Widget> screens=  [
      Home(),
      Cart(),
      fav(),
    Search(),
    Setting(),
  ];
  @override
  changePage(int currentPage) {
    currentIndex=currentPage;
    update();
  }

}