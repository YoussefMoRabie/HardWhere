import 'package:animated_flip_counter/animated_flip_counter.dart';
import 'package:conditional_builder_null_safety/conditional_builder_null_safety.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:get/get.dart';

import '../../controller/product_controller.dart';
import '../../core/constans/color.dart';

class Product extends StatelessWidget {
  const Product({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    ProductControllerImp proController=Get.put(ProductControllerImp());
    return GetBuilder<ProductControllerImp>(builder: (controller) =>Scaffold(
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
      bottomNavigationBar: Container(
          margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
          height: 40,
          child:(controller.productDetails["count"]== null|| controller.productDetails["count"]<1)?Container():
          MaterialButton(
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10)),
              color: AppColor.secColor,
              onPressed: () {
                print("5555555555555555555555555555555");
                controller.addToCart();
              },
              child: const Text(
                "Add To Cart",
                style: TextStyle(
                    color: Colors.white, fontWeight: FontWeight.bold),
              )),
      ),
      body: ConditionalBuilder(
        condition: controller.productDetails.isNotEmpty,
        builder: (BuildContext context) {
          return ListView(
            children: [
              Stack(
                clipBehavior: Clip.none,
                alignment: Alignment.topRight,
                children: [
                  Container(
                    height: 220,
                    decoration: const BoxDecoration(color: AppColor.primaryColor),
                  ),
                  Positioned(
                      top: 50.0,
                      right: Get.width / 8,
                      left: Get.width / 8,
                      child: Hero(
                        tag: "${proController.id}",

                        child: Image(image: NetworkImage("${proController.productDetails["img_link"]}"),
                          height: 230,
                        ),
                      )),
                  MaterialButton(onPressed: (){
                    controller.addToFav();
                  },
                  child:const Text("Add to Favorite")
                    ,),
                ],
              ),
              const SizedBox(
                height: 50,
              ),
              Container(
                padding: const EdgeInsets.all(20),
                child:
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Row(
                    children: [
                      Text("${proController.productDetails["product_name"]}",
                          style: Theme.of(context).textTheme.headline1!.copyWith(
                            fontSize: 30,
                            color: AppColor.darkBackGroundColor,
                          )),
                      const Spacer(),
                      RatingBarIndicator(
                        rating: double.parse(proController.productDetails["p_value"]??"0"),
                        itemBuilder: (context, index) => const Icon(
                          Icons.star,
                          color: Colors.amber,
                        ),
                        itemCount: 5,
                        itemSize: 30.0,
                        direction: Axis.horizontal,
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Row(
                    children: [

                      SizedBox(
                        height: 30,
                        width: 50,
                        child: ElevatedButton(

                          onPressed: (){
                            proController.incCount();
                          },

                          child: Icon(CupertinoIcons.minus),

                        ),
                      ),

                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: GetBuilder<ProductControllerImp>(builder: (controller) =>
                            AnimatedFlipCounter(
                              curve: Curves.elasticOut,
                              textStyle: TextStyle(fontSize: 30, color: Colors.black),
                              value: controller.count ,
                            ),),
                      ),

                      SizedBox(
                        height: 30,
                        width: 50,
                        child: ElevatedButton(
                            child:  const Icon(CupertinoIcons.plus),
                            onPressed: (){
                              proController.decCount();
                            }
                        ),
                      ),

                      const Spacer(),
                      if(proController.productDetails["has_offer"]==null||proController.productDetails["has_offer"]["data"][0]==0)
                        Text(
                          "${proController.productDetails["price"]}\$",
                          style: const TextStyle(
                              color: Colors.red, fontSize: 30, height: 1.1),
                        ),
                      if(proController.productDetails["has_offer"]!=null&&proController.productDetails["has_offer"]["data"][0]==1)
                        Text.rich(TextSpan(
                          children: <TextSpan>[
                            TextSpan(
                              text: '\$${proController.productDetails["price"]}',
                              style: const TextStyle(
                                color: Colors.grey,
                                decoration: TextDecoration.lineThrough,
                              ),
                            ),
                            TextSpan(
                              text: ' \$${proController.productDetails["new_price"]}',
                              style: const TextStyle(
                                  color: Colors.red, fontSize: 30, height: 1.1
                              ),

                            ),
                          ],
                        ),
                        )
                    ],
                  ),
                  const SizedBox(height: 10),
                  Row(
                    children: [
                      Text(
                          "Color : ",
                          style: Theme.of(context).textTheme.bodyText1!.copyWith(
                            fontSize: 15,
                            fontWeight: FontWeight.bold,
                            color: Colors.black,
                          )),
                      Text(
                          "${proController.productDetails["color"]}",
                          style: Theme.of(context).textTheme.bodyText1!.copyWith(
                              fontSize: 15
                          )),
                    ],
                  ),
                  const SizedBox(height: 5,),
                  Row(
                    children: [
                      Text(
                          "Company : ",
                          style: Theme.of(context).textTheme.bodyText1!.copyWith(
                            fontSize: 15,
                            fontWeight: FontWeight.bold,
                            color: Colors.black,
                          )),
                      Text(
                          "${proController.productDetails["su_name"]}",
                          style: Theme.of(context).textTheme.bodyText1!.copyWith(
                              fontSize: 15
                          )),
                    ],
                  ),
                  const SizedBox(height: 5,),
                  Text(
                      "Description : ",
                      style: Theme.of(context).textTheme.bodyText1!.copyWith(
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      )),
                  Row(
                    children: [
                      SizedBox(width: 50,),

                      Expanded(
                        child: Text(
                            "${proController.productDetails["desc"]}",
                            maxLines: 10,
                            style: Theme.of(context).textTheme.bodyText1!.copyWith(
                                fontSize: 15
                            )),
                      ),
                    ],
                  ),

                ]),
              )
            ],
          );
        },
        fallback: (BuildContext context) {
          return const Center(
            child: CircularProgressIndicator(),
          );
        },
      ),


    ));
  }
}
