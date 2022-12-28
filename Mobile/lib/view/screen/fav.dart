import 'package:flutter/material.dart';
import 'package:conditional_builder_null_safety/conditional_builder_null_safety.dart';
import 'package:get/get.dart';

import '../../controller/fav_controller.dart';
import '../../core/class/status_request.dart';

class fav extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    FavControllerImp favController=Get.put(FavControllerImp());
    return GetBuilder<FavControllerImp>(builder: ( controller) {
      return ConditionalBuilder(
        condition: controller.statusRequest!=StatusRequest.loading&&controller.favItems.isNotEmpty,
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
                        //Image(image: NetworkImage(model?.image??''),width: double.infinity,height: 100,),
                        Image(
                          image: NetworkImage(controller.favItems[index]["img_link"]),
                          width: 150,
                          height: 150,
                          //fit: BoxFit.fitHeight,
                        ),
                        if(controller.favItems[index]["has_offer"]!=null&&controller.favItems[index]["has_offer"]["data"][0]==1)
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
                              controller.favItems[index]["product_name"],
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                            ),
                            Spacer(),
                            Row(
                              children: [
                                if(controller.favItems[index]["has_offer"]==null||controller.favItems[index]["has_offer"]["data"][0]==0)
                                  Text(
                                    "${controller.favItems[index]["price"]}\$",
                                    style: const TextStyle(
                                        color: Colors.red, fontSize: 20,
                                        fontWeight: FontWeight.bold),
                                  ),
                                if(controller.favItems[index]["has_offer"]!=null&&controller.favItems[index]["has_offer"]["data"][0]==1)
                                  Text.rich(TextSpan(
                                    children: <TextSpan>[
                                      TextSpan(
                                        text: '\$${controller.favItems[index]["price"]}',
                                        style: const TextStyle(
                                          color: Colors.grey,
                                          decoration: TextDecoration.lineThrough,
                                        ),
                                      ),
                                      TextSpan(
                                        text: ' \$${controller.favItems[index]["new_price"]}',
                                        style: const TextStyle(
                                            color: Colors.red, fontSize: 20,
                                            fontWeight: FontWeight.bold
                                        ),

                                      ),
                                    ],
                                  ),
                                  ),



                                const Spacer(),
                                IconButton(
                                    onPressed: () {
                                      controller.deleteItem(controller.favItems[index]["pid"]);
                                    },
                                    icon: const Icon(
                                      Icons.favorite,
                                      color:
                                      Colors.red,
                                    ))
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
            itemCount: controller.favItems.length,
          );
        },
        fallback: (BuildContext context) {
          return const Center(
              child: Text('No favorites yet',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24)));
        },
      );
    },);

  }
}

Widget lll()=>ConditionalBuilder(
  condition: false,
  builder: (BuildContext context) {
    return Container();
  },
  fallback: (BuildContext context) {
    return const Center(
        child: CircularProgressIndicator(),
    );
  },
);