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
                      itemBuilder: (BuildContext context, int index) =>Padding(
                        padding: const EdgeInsets.all(20.0),
                        child: SizedBox(
                          height: 130,
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
                                if (true)
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
                                width: 10,
                              ),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'Name',
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                      style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                                    ),
                                    Spacer(),
                                    Row(
                                      children: [
                                        Text(
                                          '5555',
                                          style:
                                          TextStyle(fontSize: 18, color: Colors.deepOrange),
                                        ),
                                        SizedBox(
                                          width: 7,
                                        ),
                                        if (true)
                                          Text(
                                            '5555555',
                                            style: TextStyle(
                                                fontSize: 14,
                                                color: Colors.grey,
                                                decoration: TextDecoration.lineThrough),
                                          ),
                                        Spacer(),
                                        IconButton(
                                            onPressed: () {},
                                            icon: Icon(
                                              //ShopCubit.get(context).favoraties[model?.id]==true?Icons.favorite:
                                              Icons.favorite_border,
                                              color:
                                              // ShopCubit.get(context).favoraties[model?.id]==true?Colors.red:
                                              Colors.black,
                                            ))
                                      ],
                                    ),
                                  ],
                                ),
                              )
                            ],
                          ),
                        ),
                      ),
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
