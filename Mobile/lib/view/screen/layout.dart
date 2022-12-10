import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hardwhere/core/constans/color.dart';
import 'package:hardwhere/core/shared/styles/themes.dart';
import 'package:hardwhere/view/screen/home.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';
import 'package:switcher_button/switcher_button.dart';

import '../../controller/layout_controller.dart';

class Layout extends StatelessWidget {
  const Layout({Key? key}) : super(key: key);


  List<Widget> _buildScreens() {
    return [
          Home(),
      Container(child: Center(child: Text("lol"),),)
    ];
  }

  @override
  Widget build(BuildContext context) {
    Get.put(LayoutControllerImp());

    GlobalKey<CurvedNavigationBarState> _bottomNavigationKey = GlobalKey();


    return GetBuilder<LayoutControllerImp>(builder: (controller)=>Scaffold(
      appBar: AppBar(
        leading:const Padding(
          padding:  EdgeInsets.symmetric(horizontal: 8.0),
          child: Image(image: AssetImage('assets/images/logo.png')),
        ) ,
        title: const Text('HardWhere'),
        actions: [
          Center(
            child: SwitcherButton(
              value:  false,//!MainCubit.get(context).isDark,
              onColor: Colors.grey[200]!,
              onChange: (value) {
               ThemeService().changeTheme();

              },
            ),
          ),
        ],
      ),
      body: controller.screens.elementAt(controller.currentIndex),
      bottomNavigationBar: CurvedNavigationBar(
        key: _bottomNavigationKey,
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
