import 'package:hardwhere/main.dart';

import '../../../../API.dart';
import '../../../../core/class/curd.dart';

class FavData {
  Crud crud;
  FavData(this.crud);
  getData() async {
    var response = await crud.getData("${AppLink.fav}$id");
    return response.fold((l) => l, (r) => r);
  }
  deletePro(proId) async {
    var response = await crud.getData("${AppLink.delFav}$id&pid=$proId");
    return response.fold((l) => l, (r) => r);
  }
}