import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hardwhere/core/constans/color.dart';
import 'package:hardwhere/core/shared/styles/themes.dart';
import 'package:hardwhere/view/screen/home.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:modal_bottom_sheet/modal_bottom_sheet.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';
import 'package:switcher_button/switcher_button.dart';
import 'package:syncfusion_flutter_sliders/sliders.dart';

import '../../controller/layout_controller.dart';
import '../../controller/search_controller.dart';
import 'old_orders.dart';

class Layout extends StatelessWidget {
  const Layout({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Get.put(LayoutControllerImp());


    GlobalKey<CurvedNavigationBarState> bottomNavigationKey = GlobalKey();


    return GetBuilder<LayoutControllerImp>(builder: (controller)=>Scaffold(
      appBar: AppBar(
        leading:const Padding(
          padding:  EdgeInsets.symmetric(horizontal: 8.0),
          child: Image(image: AssetImage('assets/images/logo.png')),
        ) ,
        title: const Text('HardWhere'),
        actions: [
          Center(
            child: IconButton(
              icon: const Icon(Icons.list_alt),
              onPressed: (){
                Get.to(const Orders());
              },
            ),
          ),
        ],
      ),
      body: controller.screens.elementAt(controller.currentIndex),
      bottomNavigationBar: CurvedNavigationBar(
        key: bottomNavigationKey,
        index: 0,
        height: 60.0,
        items: const <Widget>[
          Icon(CupertinoIcons.home, size: 25,),
          Icon(CupertinoIcons.cart, size: 25),
          Icon(CupertinoIcons.suit_heart, size: 25),
          Icon(CupertinoIcons.search, size: 30),
          Icon(CupertinoIcons.settings, size: 30),
        ],
        color: HexColor("FFD580"),
        buttonBackgroundColor:AppColor.secColor,
        backgroundColor: AppColor.primaryColor,
        animationCurve: Curves.fastOutSlowIn,
        animationDuration: const Duration(milliseconds: 600),
        onTap: (index) {
          controller.changePage(index);
        },
        letIndexChange: (index) => true,
      ),
    ));

  }
}
