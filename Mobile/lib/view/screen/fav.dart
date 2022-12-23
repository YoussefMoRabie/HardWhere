import 'package:flutter/material.dart';
import 'package:conditional_builder_null_safety/conditional_builder_null_safety.dart';

class fav extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ConditionalBuilder(
      condition: true,
      builder: (BuildContext context) {
        return ListView.separated(
          itemBuilder: (BuildContext context, int index) => buildFavItem(),
          separatorBuilder: (BuildContext context, int index) {
            return Container(
              width: double.infinity,
              height: 1,
              color: Colors.grey,
            );
          },
          itemCount: 5,
        );
      },
      fallback: (BuildContext context) {
        return const Center(
            child: Text('No favorites yet',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24)));
      },
    );
    ;
  }
}

Widget buildFavItem() => Padding(
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
    );
