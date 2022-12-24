import 'package:flutter/material.dart';
import 'package:flutter_social_button/flutter_social_button.dart';
import 'package:get/get.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:hardwhere/controller/auth/login_controller.dart';
import 'package:hardwhere/core/functions/exit_alert.dart';
import 'package:hardwhere/core/functions/valid_input.dart';
import '../../../core/constans/color.dart';
import '../../../core/shared/custom_button.dart';
import '../../widget/auth/custom_text_field.dart';

class Login extends StatelessWidget {
  const Login({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    LoginControllerImp loginController= Get.put(LoginControllerImp());
    return Scaffold(backgroundColor: AppColor.lightBackGroundColor,
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: AppColor.lightBackGroundColor,
        elevation: 0,
        automaticallyImplyLeading: false,
        title: Text('Sign In',style:Theme.of(context).textTheme.bodyText1?.copyWith(fontSize: 20) ,),
      ),
      body: WillPopScope(onWillPop: exitAlert,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal:35),
        child: Form(
          key: loginController.formState,
          child: ListView(
            children:  [
              const SizedBox(height: 30,),
              Text(
                'Welcome Back',
                style: Theme.of(context).textTheme.headline2,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 15,),
              Text(
                'Sign in with your email and password \n or continue with social media',
                style: Theme.of(context).textTheme.bodyText1!.copyWith(
                  wordSpacing: 1,
                  fontSize: 14,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 30,),
              AuthTextField(
                  controller: loginController.email,

                  valid: (val){
                    return validInput(val!, 5, 100, "email");
                  },
                  labelText: 'Email',
                  sufIcon: Icons.email_outlined,
                  hintText: 'Enter your email'
              ),
              const SizedBox(height: 30,),
              GetBuilder<LoginControllerImp>(builder: (controller)=>AuthTextField(
                controller: loginController.password,
                  valid: (val){
                    return validInput(val!, 8, 100, "password");
                  },
                  hide: loginController.isShowPass,
                  labelText: 'Password',
                  sufIcon: Icons.lock_outline_rounded,
                  hintText: 'Enter your password'
              )),
              const SizedBox(height: 30,),
              Row(
                children: [
                  GetBuilder<LoginControllerImp>(builder: (controller)=>IconButton(

                      onPressed: (){
                        loginController.togglePassObscure();
                      },
                      icon: Icon(loginController.icon)
                  )),
                  const Spacer(),
                  InkWell(
                    onTap: (){},
                    child: const Text("Forget Password?",style: TextStyle(
                        color: Colors.black,
                        fontSize: 14,
                        decoration:TextDecoration.underline
                    ),
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 30,),
              customButton(onPressed: () {
                loginController.login();
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
              Padding(
                padding: const EdgeInsets.all(15.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children:  [
                    const Text("Don't have an account? ",style: TextStyle(fontSize: 16),),
                    InkWell(
                      onTap: (){
                        loginController.toSignUp();
                      },
                      child: const Text("Sign Up",style: TextStyle(
                        color: AppColor.primaryColor,
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                      ),
                    )
                  ],
                ),
              ),


            ],
          ),
        ),
      ),),

    );
  }
}
