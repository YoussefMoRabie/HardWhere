import 'package:animated_flip_counter/animated_flip_counter.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../controller/product_controller.dart';
import '../../core/constans/color.dart';

class Product extends StatelessWidget {
  const Product({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    ProductControllerImp proController=Get.put(ProductControllerImp());
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
      bottomNavigationBar: Container(
          margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
          height: 40,
          child: MaterialButton(
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10)),
              color: AppColor.secColor,
              onPressed: () {},
              child: const Text(
                "Add To Cart",
                style: TextStyle(
                    color: Colors.white, fontWeight: FontWeight.bold),
              ))),
      body: ListView(
        children: [
        Stack(
        clipBehavior: Clip.none,
        children: [
          Container(
            height: 180,
            decoration: const BoxDecoration(color: AppColor.primaryColor),
          ),
          Positioned(
              top: 30.0,
              right: Get.width / 8,
              left: Get.width / 8,
              child: Hero(
                tag: "2",//${controller.itemsModel.itemsId}",
                child: Image(image: AssetImage('assets/images/lol.png'),),
                // CachedNetworkImage(
                //   imageUrl:
                //   "${AppLink.imagestItems}/${controller.itemsModel.itemsImage!}",
                //   height: 250,
                //   fit: BoxFit.fill,
                // ),
              ))
        ],
      ),
          const SizedBox(
            height: 50,
          ),
          Container(
            padding: const EdgeInsets.all(20),
            child:
            Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text("Prodect Name",//${controller.itemsModel.itemsName}",
                  style: Theme.of(context).textTheme.headline1!.copyWith(
                    fontSize: 30,
                    color: AppColor.darkBackGroundColor,
                  )),
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
                  Text(
                    "200 \$",
                    style: const TextStyle(
                        color: Colors.red, fontSize: 30, height: 1.1),
                  )
                ],
              ),
              //PriceAndCountItems(
                 // onAdd: () {}, onRemove: () {}, price: "200.0", count: "2"),
              const SizedBox(height: 10),
              Text(
                  "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",//${controller.itemsModel.itemsDesc} ${controller.itemsModel.itemsDesc} ${controller.itemsModel.itemsDesc} ${controller.itemsModel.itemsDesc} ${controller.itemsModel.itemsDesc}",
                  style: Theme.of(context).textTheme.bodyText1!.copyWith(
                    fontSize: 15
                  )),

            ]),
          )
        ],
      ),

    );
  }
}
