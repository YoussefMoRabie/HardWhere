import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:hardwhere/core/services/services.dart';
import 'package:hardwhere/view/screen/auth/login.dart';
import 'package:hardwhere/view/screen/layout.dart';
import 'package:hardwhere/view/screen/onboarding.dart';


import 'Binding/initialBinding.dart';
import 'core/shared/styles/themes.dart';
var id=-1;
void main() async{
  WidgetsFlutterBinding.ensureInitialized();
  await GetStorage.init();

  await initialServices();
  MyServices myServices=Get.find();
  Widget startWidget=  const OnBoarding();
  if(myServices.sharedPreferences.getString("onBoarding")=="1") {
    id=int.parse(myServices.sharedPreferences.getString("id")!);
    if(id==null||id==-1){
      startWidget=const Login();

    }
    else {
      startWidget=const Layout();
    }
  }
  runApp( MyApp( startWidget: startWidget,));
}

class MyApp extends StatelessWidget {
  final Widget? startWidget;
  const MyApp({super.key,
  required this.startWidget
  });


  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      initialBinding: InitialBindings(),
      debugShowCheckedModeBanner: false,
      title: 'HardWhere',
      theme: ThemeService().lightTheme,

      darkTheme: ThemeService().darkTheme,

      themeMode: ThemeService().getThemeMode(),
      home:startWidget,
    );
  }
}



