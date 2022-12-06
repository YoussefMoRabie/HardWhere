import 'dart:io';

import 'package:flutter/material.dart';
import 'package:get/get.dart';

Future<bool> exitAlert(){
   Get.defaultDialog(
    title: "Exit",
        middleText: "Do you really want to exit",
    actions: [
      ElevatedButton(onPressed: (){
        exit(0);
      }, child: const Text("YES")),
      ElevatedButton(onPressed: (){
        Get.back();
      }, child: const Text("NO")),
    ]
  );
  return Future.value(true);
}