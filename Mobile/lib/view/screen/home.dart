import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../controller/home_controller.dart';
import '../../core/constans/color.dart';

class Home extends StatelessWidget {
  const Home({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    HomeControllerImp homeController = Get.put(HomeControllerImp());
    return Padding(
      padding: const EdgeInsets.all(15.0),
      child: ListView(
        children: [
          Container(
            height: 150,
            margin: const EdgeInsets.symmetric( vertical: 15),
            child: Stack(children: [
              Container(
                alignment: Alignment.center,

                child: ListTile(
                  title: Text("A summer surprise"  , style: TextStyle(color: Colors.white , fontSize: 20)),
                  subtitle: Text("Cashback 20%"  , style: TextStyle(color: Colors.white , fontSize: 30)),
                ),
                //height: 150,
                decoration: BoxDecoration(
                    color: AppColor.primaryColor,
                    borderRadius: BorderRadius.circular(20)
                ),
              ) ,
              const Positioned(
                top: 0,
                right: 0,
                child: CircleAvatar(
                  radius: 50,
                  backgroundColor: AppColor.secColor,

                  child: CircleAvatar(
                    backgroundColor: AppColor.secColor,
                    backgroundImage: AssetImage('assets/images/lol.png'),
                    radius: 40,

                  ),
                ),
              )
            ]),
          ),
          const Text("Categories",
              style: TextStyle(
                  fontSize: 20,
                  color: AppColor.primaryColor,
                  fontWeight: FontWeight.bold)),
          const SizedBox(height: 10),
          SizedBox(
            height: 120,
            child: ListView.separated(
              separatorBuilder: (context, index) =>
              const SizedBox(width: 10),
              itemCount: homeController.categoriesName.length,
              scrollDirection: Axis.horizontal,
              itemBuilder: (context, index) {
                return buildCatItem(homeController,index);
              },
            ),
          ),
          const SizedBox(height: 10),
          const Text("Offers",
              style: TextStyle(
                  fontSize: 20,
                  color: AppColor.primaryColor,
                  fontWeight: FontWeight.bold)),
          const SizedBox(height: 10),
          GetBuilder<HomeControllerImp>(builder: (controller){
            return  SizedBox(
              height: 180,
              child: ListView.separated(
                separatorBuilder: (context, index) =>
                const SizedBox(width: 10),
                itemCount: controller.items.length,
                scrollDirection: Axis.horizontal,
                itemBuilder: (context, i) {
                  return InkWell(
                    onTap: (){
                                  controller.goToProduct(controller.items[i]["pid"]);
                    },
                    child: Column(
                      children: [
                        Container(

                          decoration: BoxDecoration(

                              color: AppColor.lightBackGroundColor,
                              borderRadius: BorderRadius.circular(20)),
                          //padding: const EdgeInsets.symmetric(horizontal: 0),
                          height: 150,
                          width: 150,
                          child: Image(image:NetworkImage(
                            controller.items[i]["img_link"],
                          ),),
                        ),
                        const SizedBox(height: 5),
                         Text(
                          " ${controller.items[i]["product_name"]}",
                          style: const TextStyle(
                              fontSize: 20, color: Colors.black),
                        )
                      ],
                    ),
                  );
                },
              ),
            );
          })
        ],
      ),
    );
  }
}

Widget buildCatItem(controller,index)=>InkWell(
  onTap: (){
    controller.goToItems(index);
  },
  child: Column(
    children: [
      Container(

        decoration: BoxDecoration(

            color: AppColor.lightBackGroundColor,
            borderRadius: BorderRadius.circular(20)),
        height: 90,
        width: 90,
        child:  Image(image:controller.categoriesImages[index],),
      ),
      const SizedBox(height: 5),
       Text(
         controller.categoriesName[index],
        style: const TextStyle(
            fontSize: 13, color: Colors.black),
      )
    ],
  ),
);
