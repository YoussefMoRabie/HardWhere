import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:hexcolor/hexcolor.dart';

import '../../constans/color.dart';

class ThemeService{
  final ThemeData lightTheme = ThemeData(
    colorScheme: ColorScheme.fromSwatch().copyWith(
      primary: AppColor.primaryColor,
      //secondary: const Colors.yellow.shade700,
    ),
    primarySwatch: Colors.indigo,
    scaffoldBackgroundColor:AppColor.lightBackGroundColor,
    appBarTheme: const AppBarTheme(
      titleSpacing: 20,
      systemOverlayStyle: SystemUiOverlayStyle(
        statusBarColor: AppColor.primaryColor,
        statusBarIconBrightness: Brightness.dark,
      ),
      backgroundColor: AppColor.primaryColor,
      elevation: 0,
      titleTextStyle: TextStyle(
        fontFamily: 'Cairo',
        color: Colors.black,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
      iconTheme: IconThemeData(
        color: Colors.black,
      ),
    ),
    bottomNavigationBarTheme: BottomNavigationBarThemeData(
      type: BottomNavigationBarType.fixed,
      selectedItemColor: Colors.amberAccent,
    ),

    textTheme:  TextTheme(
      headline1:const TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 20,
          color: Colors.black
      ),
      headline2:const TextStyle(
          fontWeight: FontWeight.w500,
          fontSize: 26,
          color: Colors.black
      ),
      bodyText1: TextStyle(
        fontSize: 12,
        color: Colors.grey[700],
      ),
    ),

    fontFamily: 'Cairo',
  );
  final ThemeData darkTheme  = ThemeData(
    colorScheme: ColorScheme.fromSwatch().copyWith(
      primary: AppColor.primaryColor,
      //secondary: const Colors.yellow.shade700,
    ),
    primarySwatch: Colors.orange,
    scaffoldBackgroundColor: HexColor('333739'),
    appBarTheme: const AppBarTheme(
      titleSpacing: 20,
      systemOverlayStyle: SystemUiOverlayStyle(
        statusBarColor: AppColor.primaryColor,
        statusBarIconBrightness: Brightness.light,
      ),
      backgroundColor: AppColor.primaryColor,
      elevation: 0,
      titleTextStyle: TextStyle(
        color: Colors.white,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
      iconTheme: IconThemeData(
        color: Colors.white,
      ),
    ),
    bottomNavigationBarTheme: BottomNavigationBarThemeData(
      type: BottomNavigationBarType.fixed,
      selectedItemColor: Colors.deepOrange,
      backgroundColor: AppColor.darkBackGroundColor,
      unselectedItemColor: Colors.grey,

    ),

    textTheme:  TextTheme(
      headline1:const TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 20,
          color: Colors.white
      ),
      headline2:const TextStyle(
          fontWeight: FontWeight.w500,
          fontSize: 26,
          color: Colors.white
      ),
      bodyText1: TextStyle(
        fontSize: 12,
        color: Colors.grey[200],
      ),
    ),


    fontFamily: 'Cairo',
  );

  final _getStorage = GetStorage();

  final _darkThemeKey = "isDarkTheme";


  void saveThemeData(bool isDarkMode) {

    _getStorage.write(_darkThemeKey, isDarkMode);

  }
  bool isSavedDarkMode() {

    return _getStorage.read(_darkThemeKey) ?? false;

  }

  ThemeMode getThemeMode() {

    return isSavedDarkMode() ? ThemeMode.dark : ThemeMode.light;

  }
  void changeTheme() {

    Get.changeThemeMode(isSavedDarkMode() ? ThemeMode.light : ThemeMode.dark);

    saveThemeData(!isSavedDarkMode());

  }

}