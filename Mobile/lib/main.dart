import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hardwhere/core/constans/color.dart';
import 'package:hardwhere/core/services/services.dart';
import 'package:hardwhere/view/screen/auth/login.dart';
import 'package:hardwhere/view/screen/onboarding.dart';

void main() async{
  WidgetsFlutterBinding.ensureInitialized();
  await initialServices();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'HardWhere',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSwatch().copyWith(

          primary: AppColor.primaryColor,
          //secondary: const Colors.yellow.shade700,
        ),

        //primarySwatch: Colors.yellow[600],
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
        )
      ),
      home: const OnBoarding(),
    );
  }
}

