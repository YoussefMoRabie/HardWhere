import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hardwhere/view/screen/home.dart';

abstract class LayoutController extends GetxController{
 changePage(int currentPage);
}
class LayoutControllerImp extends LayoutController{
  int currentIndex=0;
  List<Widget> screens= const [
      Home(),
    Center(child: Text("cart"),),
    Center(child: Text("fav"),),
    Center(child: Text("search"),),
    Center(child: Text("setting"),),
  ];
  @override
  changePage(int currentPage) {
    currentIndex=currentPage;
    update();
  }

}