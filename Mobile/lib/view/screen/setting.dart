import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../controller/update_controller.dart';
import '../../core/shared/custom_button.dart';

class Setting extends StatelessWidget {
  const Setting({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    SettingControllerImp ordersController=Get.put(SettingControllerImp());
    return GetBuilder<SettingControllerImp>(builder: (controller)=>Padding(
      padding: const EdgeInsets.all(20.0),
      child: Form(
        key: controller.formState,
        child: ListView(
          children: [
            // if(state is ShopLoadingUpdateUserDataState)
            // LinearProgressIndicator(),
            const SizedBox(height: 20,),
            TextFormField(
              controller: controller.addressController,
              keyboardType: TextInputType.name,
              decoration: const InputDecoration(
                label: Text('Address'),
                prefixIcon: Icon(Icons.location_pin),
                border: OutlineInputBorder(),
              ),
              validator: (value){
                if(value?.isEmpty==true) {
                  return'address must not be empty';
                }
                return null;
              },


            ),
            const SizedBox(height: 20,),
            TextFormField(
              controller: controller.emailController,
              keyboardType: TextInputType.emailAddress,
              decoration: InputDecoration(
                label: Text('Email'),
                prefixIcon: Icon(Icons.email),
                border: OutlineInputBorder(),
              ),
              validator: (value){
                if(value?.isEmpty==true) {
                  return'email must not be empty';
                }
                return null;
              },


            ),
            const SizedBox(height: 20,),
            TextFormField(
              controller: controller.phoneController,
              keyboardType: TextInputType.phone,
              decoration: const InputDecoration(
                label: Text('Phone'),
                prefixIcon: Icon(Icons.phone),
                border: OutlineInputBorder(),
              ),
              validator: (value){
                if(value?.isEmpty==true) {
                  return'phone must not be empty';
                }
                return null;
              },


            ),
            const SizedBox(height: 20,),
            TextFormField(
              controller: controller.passwordController,
              keyboardType: TextInputType.phone,
              decoration: const InputDecoration(
                label: Text('Password'),
                prefixIcon: Icon(Icons.lock),
                border: OutlineInputBorder(),
              ),
              validator: (value){
                if(value?.isEmpty==true) {
                  return'Password must not be empty';
                }
                return null;
              },


            ),
            const SizedBox(height: 20,),
            customButton(onPressed: () {
              controller.update_Data();
            }, text: 'UPDATE'),
            const SizedBox(height: 20,),
            customButton(onPressed: () {
              controller.logOut();
            }, text: 'LOGOUT'),
          ],
        ),
      ),
    ));
  }
}
