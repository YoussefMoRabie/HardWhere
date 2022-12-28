import 'package:hardwhere/main.dart';

import '../../../../API.dart';
import '../../../../core/class/curd.dart';

class SearchData {
  Crud crud;
  SearchData(this.crud);
  getData(txt) async {
    var response = await crud.getData("${AppLink.search}$txt");
    return response.fold((l) => l, (r) => r);
  }
}