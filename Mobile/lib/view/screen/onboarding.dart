import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hardwhere/controller/onboarding_controller.dart';
import 'package:hardwhere/core/services/services.dart';
import 'package:hardwhere/view/screen/auth/login.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';

import '../../core/constans/color.dart';
import '../../core/shared/custom_button.dart';
import '../../data/data_source/static/static.dart';
import '../../data/model/onboarding_model.dart';

class OnBoarding extends StatelessWidget {
  const OnBoarding({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    var boardController = PageController();
    Get.put(OnBoardingControllerImp());
    MyServices myServices = Get.find();

    return Scaffold(
      body: Container(
        width: double.infinity,
        decoration: BoxDecoration(
            color: AppColor.lightBackGroundColor,
            image:  const DecorationImage(image: AssetImage('assets/images/OnBoardingBG.png'),
            fit: BoxFit.fitWidth
            )
        ),
        child:Column(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            Expanded(
              flex: 3,
              child: GetBuilder<OnBoardingControllerImp>(builder: (controller) =>PageView.builder(
                onPageChanged: (index){
                  controller.changeIndex(index);
                },
                controller: boardController,
                physics: const BouncingScrollPhysics(),
                itemCount: onBoardingList.length,
                itemBuilder: (context, index) =>
                    buildBoardingItem(onBoardingList[index],context),
              ),

              ),
            ),
            Expanded(
              child: Column(
                children: [
                  SmoothPageIndicator(
                    controller: boardController,
                    count: 3,
                    effect: const SwapEffect(
                        dotWidth: 12.0,
                        dotHeight: 12.0,
                      type: SwapType.yRotation,
                      activeDotColor: AppColor.primaryColor,
                    )

                  ),
                  const SizedBox(height: 50,),

                  GetBuilder<OnBoardingControllerImp>(builder: ( controller) =>Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 30.0),
                    child: customButton(onPressed: () {
                      print(controller.currentPage);
                      if(controller.currentPage==2)
                        {

                          myServices.sharedPreferences.setString("onBoarding", "1");
                          controller.toLogin();
                        }
                      else{
                        boardController.nextPage(
                            duration: const Duration(
                              milliseconds: 1000,
                            ),
                            curve: Curves.fastLinearToSlowEaseIn);
                      }

                    }, text: controller.currentPage==2?'FINISH':'NEXT'),

                  ),
                  ),
                ],
              ),
            ),
          ],
        )
      ),
    );
  }
}


 Widget buildBoardingItem(OnBoardingModel model,context) =>Column(
   mainAxisAlignment: MainAxisAlignment.end,
   children: [
     Padding(
       padding: const EdgeInsets.all(30.0),
       child: Image(image: AssetImage(model.image!)),
     ),

     Text(
       model.title!,
       style: Theme.of(context).textTheme.headline1,
     ),
     Padding(
       padding: const EdgeInsets.all(20.0),
       child: Text(model.body!,
         style: Theme.of(context).textTheme.bodyText1,
       ),
     )
   ],
 );