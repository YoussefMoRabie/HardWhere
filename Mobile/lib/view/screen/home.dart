import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../controller/home_controller.dart';
import '../../core/constans/color.dart';

class Home extends StatelessWidget {
  const Home({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    HomeControllerImp controller = Get.put(HomeControllerImp());
    return Column(
      children: [
        Container(
          height: 150,
          margin: const EdgeInsets.symmetric(horizontal: 15, vertical: 15),
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
            itemCount: 8,
            scrollDirection: Axis.horizontal,
            itemBuilder: (context, index) {
              return buildCatItem(controller,index);
            },
          ),
        ),
        const SizedBox(height: 10),
        const Text("Product for you",
            style: TextStyle(
                fontSize: 20,
                color: AppColor.primaryColor,
                fontWeight: FontWeight.bold)),
        const SizedBox(height: 10),
        SizedBox(
          height: 200,
          child: ListView.builder(
              itemCount: 3,
              scrollDirection: Axis.horizontal,
              itemBuilder: (context, i) {
                return SizedBox(
                  height: 120,
                  child: Stack(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 10, vertical: 10),
                        margin: const EdgeInsets.symmetric(
                            horizontal: 10),
                        child: Image(image:
                        AssetImage('assets/images/lol.png'),height: 100,width: 130,),
                      ),
                      Container(
                        decoration: BoxDecoration(
                            color: Colors.black.withOpacity(0.1),
                            borderRadius:
                            BorderRadius.circular(20)),
                        height: 120,
                        width: 160,
                      ),
                      const Positioned(
                          top: 5,
                          left: 10,
                          child: Text(
                            "Laptop Surface Go 2",
                            style: TextStyle(
                                color: Colors.black,
                                fontWeight: FontWeight.bold,
                                fontSize: 14),
                          ))
                    ],
                  ),
                );
              }),
        )
      ],
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

            color: AppColor.primaryColor,
            borderRadius: BorderRadius.circular(20)),
        //padding: const EdgeInsets.symmetric(horizontal: 0),
        height: 90,
        width: 90,
        child: const Image(image:AssetImage('assets/images/lol.png'),),
        // SvgPicture.network(
        //     "categories_image}",
        //     color: AppColor.secColor),
      ),
      const SizedBox(height: 5),
      const Text(
        "categories_name",
        style: TextStyle(
            fontSize: 13, color: Colors.black),
      )
    ],
  ),
);
