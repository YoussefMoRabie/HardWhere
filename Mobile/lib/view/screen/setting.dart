import 'package:flutter/material.dart';

import '../../core/shared/custom_button.dart';

class Setting extends StatelessWidget {
  const Setting({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var nameController=TextEditingController();
    var emailController=TextEditingController();
    var phoneController=TextEditingController();
    var passwordController=TextEditingController();
    return Padding(
      padding: const EdgeInsets.all(20.0),
      child: ListView(
        children: [
         // if(state is ShopLoadingUpdateUserDataState)
            LinearProgressIndicator(),
          const SizedBox(height: 20,),
          TextFormField(
            controller: nameController,
            keyboardType: TextInputType.name,
            decoration: InputDecoration(
              label: Text('Name'),
              prefixIcon: Icon(Icons.person),
              border: OutlineInputBorder(),
            ),
            validator: (value){
              if(value?.isEmpty==true)
                return'name must not be empty';
              return null;
            },


          ),
          const SizedBox(height: 20,),
          TextFormField(
            controller: emailController,
            keyboardType: TextInputType.emailAddress,
            decoration: InputDecoration(
              label: Text('Email'),
              prefixIcon: Icon(Icons.email),
              border: OutlineInputBorder(),
            ),
            validator: (value){
              if(value?.isEmpty==true)
                return'email must not be empty';
              return null;
            },


          ),
          const SizedBox(height: 20,),
          TextFormField(
            controller: phoneController,
            keyboardType: TextInputType.phone,
            decoration: InputDecoration(
              label: Text('Phone'),
              prefixIcon: Icon(Icons.phone),
              border: OutlineInputBorder(),
            ),
            validator: (value){
              if(value?.isEmpty==true)
                return'phone must not be empty';
              return null;
            },


          ),
          const SizedBox(height: 20,),
          TextFormField(
            controller: phoneController,
            keyboardType: TextInputType.phone,
            decoration: InputDecoration(
              label: Text('Password'),
              prefixIcon: Icon(Icons.phone),
              border: OutlineInputBorder(),
            ),
            validator: (value){
              if(value?.isEmpty==true)
                return'phone must not be empty';
              return null;
            },


          ),
          const SizedBox(height: 20,),
          customButton(onPressed: () {
          }, text: 'UPDATE'),
          const SizedBox(height: 20,),
          customButton(onPressed: () {
          }, text: 'LOGOUT'),
        ],
      ),
    );
  }
}
