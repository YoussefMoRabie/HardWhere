import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hardwhere/core/class/status_request.dart';
import 'package:modal_bottom_sheet/modal_bottom_sheet.dart';

import '../../controller/search_controller.dart';
import '../../core/constans/color.dart';

class Search extends StatelessWidget {
 const Search({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var searchController = TextEditingController();
    var formKey = GlobalKey<FormState>();
    SearchControllerImp SearchController=Get.put(SearchControllerImp());
    return GetBuilder<SearchControllerImp>(builder: ( controller) {
      return
      Form(
        key: formKey,
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              TextFormField(
                validator: (value) {
                  if (value!.isEmpty) {
                    return "search must not be empty";
                  }
                  return null;
                },
                onChanged: (value){
                  controller.getSearchData(value);
                  //SearchCubit.get(context).search(value);
                },
                controller: searchController,
                keyboardType: TextInputType.text,
                decoration: const InputDecoration(
                  labelText: 'Search',
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.search),

                ),
              ),
              if(controller.statusRequest!=StatusRequest.success)
              if(searchController.text.isNotEmpty)
                const LinearProgressIndicator(),

              const SizedBox(height: 20,),
              // if(state is ShopSearchSuccessState)
              if(searchController.text.isNotEmpty)
                Expanded(
                  child: ListView.separated(
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
                  ),
                ),
              // if(controller.Items.isNotEmpty)
              GetBuilder<SearchControllerImp>(builder: (controller_)=>FloatingActionButton(
                backgroundColor: AppColor.secColor,
                onPressed: () {

                  showMaterialModalBottomSheet(
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.vertical(top: Radius.circular(30))
                    ),
                    context: context,
                    builder: (context) => SingleChildScrollView(
                      controller: ModalScrollController.of(context),
                      child: Container(
                        child: Column(
                          children: [
                            CheckboxListTile(
                              title: Text("title text"),
                              value: controller_.checkedValue,
                              onChanged: (newValue) {
                                print(newValue);
                                controller_.changeCheckBox();
                              },
                              controlAffinity: ListTileControlAffinity.leading,  //  <-- leading Checkbox
                            ),
                            Text("LOL",style: TextStyle(fontSize: 25),),
                            Text("LOL",style: TextStyle(fontSize: 25),),
                            Text("LOL",style: TextStyle(fontSize: 25),),
                          ],
                        ),
                      ),
                    ),
                  );
                },
                child: Icon(Icons.filter_alt_outlined),
              )),
            ],
          ),
        ));
    });
  }
}
