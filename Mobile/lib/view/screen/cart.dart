import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hardwhere/core/constans/color.dart';

import '../../controller/cart_controller.dart';
final ButtonStyle flatButtonStyle = TextButton.styleFrom(
  foregroundColor: Colors.black87,
  backgroundColor: AppColor.primaryColor,
 // minimumSize: Size(88, 36),

  padding: EdgeInsets.symmetric(horizontal: 16.0),
  shape: const RoundedRectangleBorder(
    borderRadius: BorderRadius.all(Radius.circular(20.0)),
  ),
);

class Cart extends StatelessWidget {
  const Cart({super.key});

  @override
  Widget build(BuildContext context) {
    CartControllerImp cartController=Get.put(CartControllerImp());

    return Scaffold(
      body:
      Column(
        children: [
          Expanded(
            child: ListView.separated(
              itemBuilder: (BuildContext context, int index) =>Padding(
                padding: const EdgeInsets.all(20.0),
                child: SizedBox(
                  height: 140,
                  child: Row(
                    children: [
                      Stack(alignment: AlignmentDirectional.topStart, children: [
                        //Image(image: NetworkImage(model?.image??''),width: double.infinity,height: 100,),
                        Image(
                          image: AssetImage('assets/images/lol.png'),
                          width: 150,
                          height: 150,
                          //fit: BoxFit.fitHeight,
                        ),
                        if (false)
                          Container(
                            color: Colors.red,
                            child: Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 10),
                              child: Text(
                                'DISCOUNT',
                                style: TextStyle(fontSize: 10, color: Colors.white),
                              ),
                            ),
                          )
                      ]),
                      const SizedBox(
                        width: 5,
                      ),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Name',
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                            ),
                            Row(
                              children: [
                                Text(
                                  '5555',
                                  style:
                                  TextStyle(fontSize: 18, color: AppColor.secColor),
                                ),
                                Spacer(),
                                IconButton(
                                    onPressed: () {},
                                    icon: Icon(
                                      //ShopCubit.get(context).favoraties[model?.id]==true?Icons.favorite:
                                      Icons.delete_forever_rounded,
                                      color:
                                      // ShopCubit.get(context).favoraties[model?.id]==true?Colors.red:
                                      Colors.red,
                                    ))
                              ],
                            ),
                            Container(
                               width: 110,
                               height: 40,
                              color: Colors.grey[300],
                              child: Row(children: [
                                IconButton(onPressed: () {
                                  cartController.decCount();
                                }, icon: const Icon(Icons.remove)),

                                Padding(

                                  padding: const EdgeInsets.all(1.0),
                                  child: GetBuilder<CartControllerImp>(
                                    builder: (controller){
                                      return Text("${controller.count}",style: TextStyle(fontSize: 18,fontWeight: FontWeight.bold),);
                                    },
                                  ),

                                ),

                                IconButton(onPressed: () {
                                  cartController.incCount();
                                }, icon: const Icon(Icons.add)),


                              ],),
                            )
                          ],
                        ),
                      )
                    ],
                  ),
                ),
              ),
              separatorBuilder: (BuildContext context, int index) {
                return Container(
                  width: double.infinity,
                  height: 1,
                  color: Colors.grey,
                );
              },
              itemCount: 5,
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(10.0),
            child: Row(
              children: [
                Padding(
                  padding: const EdgeInsets.only(right: 20),
                  child: Column(
                    children: [
                      Text(
                        'TOTAL',
                        style:
                        TextStyle(fontSize: 20, color: AppColor.darkBackGroundColor,fontWeight: FontWeight.bold),
                      ),
                      SizedBox(height: 15,),
                      Text(
                        '\$ 5555',
                        style:
                        TextStyle(fontSize: 18, color: AppColor.secColor),
                      ),

                    ],
                  ),
                ),

                Expanded(

                  child: SizedBox(
                    height:40,
                    child: TextButton(
                        style: flatButtonStyle,

                        onPressed: (){},

                      child: const Text('CHECKOUT', style: TextStyle(color: Colors.white,fontWeight: FontWeight.bold,fontSize: 18),)
    ),
                  ),
                ),

              ],
            ),
          )
        ],
      ),
    );
  }
}


