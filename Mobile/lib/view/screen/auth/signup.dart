import 'package:flutter/material.dart';
import 'package:flutter_social_button/flutter_social_button.dart';
import 'package:get/get.dart';
import 'package:hardwhere/controller/auth/signup_contoller.dart';
import '../../../core/constans/color.dart';
import '../../../core/functions/valid_input.dart';
import '../../../core/shared/custom_button.dart';
import '../../widget/auth/custom_text_field.dart';

class SignUp extends StatelessWidget {
  const SignUp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    SignUpControllerImp controller=Get.put(SignUpControllerImp());
    return Scaffold(backgroundColor: AppColor.lightBackGroundColor,
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: AppColor.lightBackGroundColor,
        elevation: 0,
        leading: IconButton(
          onPressed: () {
            Get.back();

          },
          icon: const Icon(Icons.arrow_back_ios_new_outlined,color: Colors.black,),

        ),
        title: Text('Sign Up',style:Theme.of(context).textTheme.bodyText1?.copyWith(fontSize: 20) ,),
      ),
      body: Form(
        key: controller.formState,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal:35),
          child: ListView(
            children:  [
              const SizedBox(height: 30,),
               Text(
                  'Welcome',
                style: Theme.of(context).textTheme.headline2,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 15,),
              Text(
                'Sign Up with your information \n or continue with social media',
                style: Theme.of(context).textTheme.bodyText1!.copyWith(
                  wordSpacing: 1,
                  fontSize: 14,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 30,),
               AuthTextField(
                  valid: (val){
                    return validInput(val!, 5, 100, "username");
                  },
                  labelText: 'Username',
                  sufIcon: Icons.person_outline,
                  hintText: 'Enter your username'
              ),
              const SizedBox(height: 30,),
               AuthTextField(
                   valid: (val){
                     return validInput(val!, 5, 100, "email");
                   },
                  labelText: 'Email',
                  sufIcon: Icons.email_outlined,
                  hintText: 'Enter your email'
              ),
              const SizedBox(height: 30,),
               AuthTextField(
                  valid: (val){
                    return validInput(val!, 5, 100, "phone");
                  },
                  labelText: 'Phone',
                  sufIcon: Icons.phone_outlined,
                  hintText: 'Enter your phone'
              ),
              const SizedBox(height: 30,),
               AuthTextField(
                   valid: (val){
                     return validInput(val!, 5, 100, "password");
                   },
                  labelText: 'Password',
                  sufIcon: Icons.lock_outline_rounded,
                  hintText: 'Enter your password'
              ),
              const SizedBox(height: 50,),
              customButton(onPressed: () {
                controller.tologin();
              }, text: 'Sign In'),
              const SizedBox(height: 30,),

              Row(

                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: FlutterSocialButton(
                      onTap: () {},
                      mini: true,
                      buttonType: ButtonType.apple, // Button type for different type buttons
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: FlutterSocialButton(
                      onTap: () {},
                      mini: true,
                      buttonType: ButtonType.facebook, // Button type for different type buttons
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: FlutterSocialButton(
                      onTap: () {},
                      mini: true,

                      buttonType: ButtonType.twitter, // Button type for different type buttons
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10,),


            ],
          ),
        ),
      ),

    );
  }
}
