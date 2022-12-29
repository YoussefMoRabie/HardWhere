import 'package:conditional_builder_null_safety/conditional_builder_null_safety.dart';
import 'package:custom_radio_grouped_button/custom_radio_grouped_button.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hardwhere/controller/checkout_controller.dart';
import 'package:hardwhere/core/constans/color.dart';

class CheckOut extends StatelessWidget {
  const CheckOut({super.key});
  @override
  Widget build(BuildContext context) {
    CheckOutControllerImp coController=Get.put(CheckOutControllerImp());
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          onPressed: () {
            Get.back();

          },
          icon: const Icon(Icons.arrow_back_ios_new_outlined,color: Colors.black,),

        ),
        title: Row(
          children: [
            Container(
              height: 40,
              child: Padding(
                padding:  EdgeInsets.symmetric(horizontal: 8.0),
                child: Image(image: AssetImage('assets/images/logo.png')),
              ),
            ) ,
            const Text('HardWhere'),
          ],
        ),

      ),

      backgroundColor: AppColor.lightBackGroundColor,
      body: GetBuilder<CheckOutControllerImp>(builder: (controller) {
        return ConditionalBuilder(
          condition: controller.items.isNotEmpty,
          builder: (BuildContext context) {
            return SafeArea(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 30.0),
                      child: Text(
                        "CART",
                        style: TextStyle(
                            fontSize: 18.0,
                            fontWeight: FontWeight.bold,
                            color: Colors.grey.shade700),
                      )),
                  Expanded(
                    child: ListView.builder(
                      padding: const EdgeInsets.all(16.0),
                      itemCount: coController.products.length,
                      itemBuilder: (BuildContext context, int index) {
                        return Stack(
                          children: <Widget>[
                            Container(
                              width: double.infinity,
                              margin: const EdgeInsets.only(right: 10.0,left: 10, bottom: 10.0),
                              child: Material(
                                borderRadius: BorderRadius.circular(5.0),
                                elevation: 3.0,
                                child: Container(
                                  padding: EdgeInsets.all(16.0),
                                  child: Row(
                                    children: <Widget>[
                                      Container(
                                        height: 80,
                                        child: Image(image:NetworkImage(controller.products[index]["img_link"]),),
                                      ),
                                      SizedBox(
                                        width: 10.0,
                                      ),
                                      Expanded(
                                        child: Column(
                                          crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                          children: <Widget>[
                                            Text(
                                            "${controller.products[index]["product_name"]}  X ${controller.products[index]["qty"]}",
                                              style: TextStyle(
                                                  fontSize: 16.0,
                                                  fontWeight: FontWeight.bold),
                                            ),
                                            SizedBox(
                                              height: 20.0,
                                            ),
                                            if(controller.products[index]["has_offer"]==null||controller.products[index]["has_offer"]["data"][0]==0)
                                              Text(
                                                "\$${controller.products[index]["price"]}",
                                                style: const TextStyle(
                                                    color: AppColor.secColor, fontSize: 18,
                                                    fontWeight: FontWeight.bold),
                                              ),
                                            if(controller.products[index]["has_offer"]!=null&&controller.products[index]["has_offer"]["data"][0]==1)
                                              Text.rich(TextSpan(
                                                children: <TextSpan>[
                                                  TextSpan(
                                                    text: ' \$${controller.products[index]["new_price"]}',
                                                    style: const TextStyle(
                                                        color: AppColor.secColor,
                                                        fontSize: 18,
                                                        fontWeight: FontWeight.bold
                                                    ),

                                                  ),
                                                  TextSpan(
                                                    text: '  ',
                                                    style: const TextStyle(
                                                        color: AppColor.secColor,
                                                        fontSize: 18,
                                                        fontWeight: FontWeight.bold
                                                    ),

                                                  ),
                                                  TextSpan(
                                                    text: '\$${controller.products[index]["price"]}',
                                                    style: const TextStyle(
                                                      color: Colors.grey,
                                                      decoration: TextDecoration.lineThrough,
                                                    ),
                                                  ),
                                                ],
                                              ),
                                              ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                          ],
                        );
                      },
                    ),
                  ),
                  SizedBox(height: 10,),
                  Container(
                    height: 120,
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 8.0),
                      child: ListView.separated(
                        separatorBuilder: (context, index) =>
                        const SizedBox(width: 10),
                        itemCount: controller.items.length,
                        scrollDirection: Axis.horizontal,
                        itemBuilder: (context, index) {
                          return InkWell(
                            onTap: (){
                              controller.changeSC(index);
                            },
                            child: Column(
                              children: [
                                Container(

                                  decoration: BoxDecoration(
                                      border:(controller.selectedSC== index)! ?const Border(
                                        bottom: BorderSide(width: 3,color: AppColor.primaryColor),
                                        top: BorderSide(width: 3,color: AppColor.primaryColor),
                                        left: BorderSide(width: 3,color: AppColor.primaryColor),
                                        right: BorderSide(width: 3,color: AppColor.primaryColor),
                                      ): null,
                                      color: AppColor.lightBackGroundColor,
                                      borderRadius: BorderRadius.circular(20)),
                                  height: 120,
                                  width: 200,
                                  child: Column(

                                    mainAxisAlignment: MainAxisAlignment.center,

                                    children: [
                                      Text("${controller.items[index]["sc_name"]}",style: TextStyle(color: AppColor.secColor,fontWeight: FontWeight.bold,fontSize: 22),),
                                      Text("In : ${controller.items[index]["delivery_time"]} Days",style: TextStyle(color: AppColor.darkBackGroundColor,fontWeight: FontWeight.bold,fontSize: 18),),
                                      Text("${controller.items[index]["cost"]}\$",style: TextStyle(color: AppColor.darkBackGroundColor,fontWeight: FontWeight.bold,fontSize: 15),),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          );
                        },
                      ),
                    ),
                  ),


                  Container(
                    width: double.infinity,
                    padding: EdgeInsets.all(20.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: <Widget>[
                        Text(
                          "Subtotal      \$${controller.total}",
                          style:
                          TextStyle(color: Colors.grey.shade700, fontSize: 16.0),
                        ),
                        SizedBox(
                          height: 5.0,
                        ),
                        Text(
                          "Delivery       \$${controller.items[controller.selectedSC]["cost"]}",
                          style:
                          TextStyle(color: Colors.grey.shade700, fontSize: 16.0),
                        ),
                        SizedBox(
                          height: 10.0,
                        ),
                        Text(
                          "Cart Subtotal     \$${controller.items[controller.selectedSC]["cost"]+controller.total}",
                          style:
                          TextStyle(fontWeight: FontWeight.bold, fontSize: 18.0),
                        ),
                        SizedBox(
                          height: 20.0,
                        ),
                        SizedBox(
                          width: double.infinity,
                          child:          MaterialButton(
                              shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10)),
                              color: AppColor.secColor,
                              height:40 ,
                              onPressed: () {
                                 controller.makeOrder();
                              },
                              child: const Text(
                                "Complete",
                                style: TextStyle(
                                    color: Colors.white, fontWeight: FontWeight.bold),
                              )),


                        )
                      ],
                    ),
                  )
                ],
              ),
            );
          },
          fallback: (BuildContext context) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          },
        );
      },),
    );
  }
}