import 'package:flutter/material.dart';

import 'fav.dart';

class Search extends StatelessWidget {
 const Search({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var searchController = TextEditingController();
    var formKey = GlobalKey<FormState>();
    return Form(
        key: formKey,
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            children: [
              TextFormField(
                validator: (value) {
                  if (value!.isEmpty) {
                    return "search must not be empty";
                  }
                  return null;
                },
                onChanged: (value){
                  //SearchCubit.get(context).search(value);
                },
                controller: searchController,
                keyboardType: TextInputType.text,
                decoration: InputDecoration(
                  labelText: 'Search',
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.search),

                ),
              ),
              //if(state is ShopSearchLoadingState)
              if(!searchController.text.isEmpty)
                const LinearProgressIndicator(),

              SizedBox(height: 20,),
              // if(state is ShopSearchSuccessState)
              if(!searchController.text.isEmpty)
                Expanded(
                  child: ListView.separated(
                      itemBuilder: (BuildContext context, int index) =>buildFavItem(),
                      separatorBuilder: (BuildContext context, int index) {
                        return Container(width: double.infinity,height: 1,color: Colors.grey,);
                      },
                      itemCount:5  ),
                ),
            ],
          ),
        ));
  }
}
