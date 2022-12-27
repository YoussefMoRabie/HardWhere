import '../../../../API.dart';
import '../../../../core/class/curd.dart';

class ProductData {
  Crud crud;
  ProductData(this.crud);
  getData(int id) async {
    var response = await crud.getData("${AppLink.productData}$id");
    return response.fold((l) => l, (r) => r);
  }
}