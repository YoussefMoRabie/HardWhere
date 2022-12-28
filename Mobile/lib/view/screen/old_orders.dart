import 'package:animated_flip_counter/animated_flip_counter.dart';
import 'package:conditional_builder_null_safety/conditional_builder_null_safety.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:get/get.dart';

import '../../controller/orders_controller.dart';
import '../../controller/product_controller.dart';
import '../../core/class/status_request.dart';
import '../../core/constans/color.dart';

class Orders extends StatelessWidget {
  const Orders({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    OrdersControllerImp ordersController=Get.put(OrdersControllerImp());
    return GetBuilder<OrdersControllerImp>(builder: (controller) =>Scaffold(
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
      // bottomNavigationBar: Container(
      //     margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
      //     height: 40,
      //     child:(controller.productDetails["count"]== null|| controller.productDetails["count"]<1)?Container(
      //               decoration: BoxDecoration(
      //                 color: AppColor.secColor,
      //                 borderRadius: BorderRadius.circular(10),
      //               ),
      //       child: const Center(
      //         child: Text(
      //           "Sold Out",
      //           style: TextStyle(
      //               color: Colors.white, fontWeight: FontWeight.bold),
      //         ),
      //       ),
      //     ):
      //     MaterialButton(
      //         shape: RoundedRectangleBorder(
      //             borderRadius: BorderRadius.circular(10)),
      //         color: AppColor.secColor,
      //         onPressed: () {
      //           controller.addToCart();
      //         },
      //         child: const Text(
      //           "Add To Cart",
      //           style: TextStyle(
      //               color: Colors.white, fontWeight: FontWeight.bold),
      //         )),
      // ),

      body: GetBuilder<OrdersControllerImp>(builder: (controller) {
        return ConditionalBuilder(
          condition: controller.statusRequest!=StatusRequest.loading&&controller.Items.isNotEmpty,
          builder: (BuildContext context) {
            return ListView.separated(
              itemBuilder: (BuildContext context, int index) {
                return Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: SizedBox(
                    height: 130,
                    child: Row(
                      children: [
                        Stack(alignment: AlignmentDirectional.topStart, children: [
                          Image(
                            image: NetworkImage(controller.Items[index]["img_link"]),
                            width: 150,
                            height: 150,
                            //fit: BoxFit.fitHeight,
                          ),
                          if(controller.Items[index]["has_offer"]!=null&&controller.Items[index]["has_offer"]["data"][0]==1)
                            Container(
                              color: Colors.red,
                              child: const Padding(
                                padding: EdgeInsets.symmetric(horizontal: 10),
                                child: Text(
                                  'DISCOUNT',
                                  style: TextStyle(fontSize: 10, color: Colors.white),
                                ),
                              ),
                            )
                        ]),
                        const SizedBox(
                          width: 10,
                        ),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                controller.Items[index]["product_name"],
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                              ),
                              Spacer(),
                              Row(
                                children: [
                                  if(controller.Items[index]["has_offer"]==null||controller.Items[index]["has_offer"]["data"][0]==0)
                                    Text(
                                      "${controller.Items[index]["price"]}\$",
                                      style: const TextStyle(
                                          color: Colors.red, fontSize: 20,
                                          fontWeight: FontWeight.bold),
                                    ),
                                  if(controller.Items[index]["has_offer"]!=null&&controller.Items[index]["has_offer"]["data"][0]==1)
                                    Text.rich(TextSpan(
                                      children: <TextSpan>[
                                        TextSpan(
                                          text: '\$${controller.Items[index]["price"]}',
                                          style: const TextStyle(
                                            color: Colors.grey,
                                            decoration: TextDecoration.lineThrough,
                                          ),
                                        ),
                                        TextSpan(
                                          text: ' \$${controller.Items[index]["new_price"]}',
                                          style: const TextStyle(
                                              color: Colors.red, fontSize: 20,
                                              fontWeight: FontWeight.bold
                                          ),

                                        ),
                                      ],
                                    ),
                                    ),



                                  const Spacer(),
                                ],
                              ),
                            ],
                          ),
                        )
                      ],
                    ),
                  ),
                );
              },
              separatorBuilder: (BuildContext context, int index) {
                return Container(
                  width: double.infinity,
                  height: 1,
                  color: Colors.grey,
                );
              },
              itemCount: controller.Items.length,
            );
          },
          fallback: (BuildContext context) {
            return const Center(
                child: Text('No Orders yet',
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24)));
          },
        );
      },)





    ));
  }
}
